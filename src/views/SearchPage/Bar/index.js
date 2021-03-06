import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass';
import {uuid} from '../../../ulils';
import {withLocalStore} from '../withLocalStore';
import {requestManager} from '../../../ulils';
import {Navigator} from '../../../Navigator';

/**
 * https://stackoverflow.com/a/10795797
 * @return {number}
 */
export function getDocHeight() {
  const D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight,
  );
}
let isLoading = false;
const loadOnScroll = (page) => {
  const ev = (e) => {
    if (!document.querySelector('#search_bar')) {
      document.removeEventListener('scroll', ev);
      return;
    }
    if(isLoading)
      return;
    if (window.scrollY + window.innerHeight >= getDocHeight() - 20) {
      isLoading = true;
      page.props.setStore((s) => ({
        bar: {
          ...s.bar,
          preview: {
            ...s.bar.preview,
            since: Number(s.bar.preview.since) + 1,
          },
        },
      }));
      requestManager.trySearch(page.props.getStore().bar.preview)
        .then(async (r) => {
          const res = await r.json();
          const persons = res.persons?.map((p) => ({
            ...p,
            innerId: uuid(),
          })) ?? [];
          const vacancies = res.vacancies?.map((p) => ({
            ...p,
            innerId: uuid(),
          })) ?? [];
          const organizations = res.organizations?.map((p) => ({
            ...p,
            innerId: uuid(),
          })) ?? [];
          if (persons.length + vacancies.length + organizations.length === 0) {
            page.props.setStore((s) => ({
              bar: {
                ...s.bar,
                preview: {
                  ...s.bar.preview,
                  since: Number(s.bar.preview.since) - 1,
                },
              },
            }));
            isLoading = false;
            return;
          }
          page.props.setStore((s) => ({
            search: {
              persons: [...s.search.persons, ...persons],
              vacancies: [...s.search.vacancies, ...vacancies],
              organizations: [...s.search.organizations, ...organizations],
            },
          }));
          isLoading = false;
          page.props.requestNextNoUpdate();
        })
        .catch((e) => {
          isLoading = false;
          console.log(e);
          alert('Похоже, сервер недоступен');
        });
    }
  };
  return ev;
};

/**
 * https://stackoverflow.com/a/5448635
 */
export function getSearchParameters() {
  const prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != '' ? transformToAssocArray(prmstr) : {};
}

/**
 *
 */
export function transformToAssocArray(prmstr) {
  const params = {};
  const prmarr = prmstr.split('&');
  for (let i = 0; i < prmarr.length; i++) {
    const tmparr = prmarr[i].split('=');
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

const searchEvent = (page) => (e) => {
  page.props.setStore((s) => ({
    bar: {
      ...s.bar,
      raw: {
        ...s.bar.raw,
        requestBody: e.target.value,
      },
    },
  }));
};

const clickEvent = (page) => () => {
  page.props.setStore((s) => ({
    bar: {
      ...s.bar,
      preview: {
        ...s.bar.raw,
        requestBody: s.bar.raw.requestBody.replace(/#|@/g, '')
      }
    },
  }));
  requestManager.trySearch(page.props.getStore().bar.preview)
    .then(async (r) => {
      const res = await r.json();
      const persons = res.persons?.map((p) => ({...p, innerId: uuid()})) ?? [];
      const vacancies = res.vacancies?.map((p) => ({
        ...p,
        innerId: uuid(),
      })) ?? [];
      const organizations = res.organizations?.map((p) => ({
        ...p,
        innerId: uuid(),
      })) ?? [];
      const oldS =  page.props.getStore().search;
      const items = []
      if(oldS.organizations) {
        items.push(...oldS.organizations)
      }
      if(oldS.persons) {
        items.push(...oldS.persons)
      }
      if(oldS.vacancies) {
        items.push(...oldS.vacancies)
      }
      for(let i of items) {
        i.element.reset();
        delete i.element
      }
      page.props.setStore({
        search: {
          persons,
          vacancies,
          organizations,
        },
      });
      page.props.requestNextNoUpdate();
      const type = page.props.getStore().bar.preview.type;
      const newType = type === 'organization' ? 'organizations' :
        type === 'vacancy' ? 'vacancies' :
          type === 'person' ? 'users' : '';
      if (type === '')
        Navigator.showPage('/search');
      else
        Navigator.showPage('/search/' + newType);
    })
    .catch((e) => {
      console.log(e);
      alert('Похоже, сервер недоступен');
    });
};

const setTypeEvent = (page, type) => (e) => {
  Array.from(document.querySelectorAll('.selected'))
    .forEach((d) => d.classList.remove('selected'));
  e.target.classList.add('selected');
  page.props.setStore((s) => ({
    bar: {
      ...s.bar,
      raw: {
        ...s.bar.raw,
        type,
      },
    },
  }));
  page.doSearch(e);
};

class Bar extends Page {
  #lastPath;
  constructor(props) {
    super(props);
    this.props.searchId = uuid();
    this.props.clickId = uuid();
    this.props.typeId = uuid();
  }

  render() {
    return template(this.props);
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    if(window.location.pathname !== this.#lastPath && window.location.pathname !== this.#lastPath + '/' ) {
      this.#lastPath = window.location.pathname
      this.needUpdate()
    }
  }

  componentDidMount() {
    super.componentDidMount();

    document.addEventListener('scroll', loadOnScroll(this));

    const search = document.getElementById(this.props.searchId);
    const click = document.getElementById(this.props.clickId);
    const typeEl = document.getElementById(this.props.typeId);

    const all = typeEl.querySelector('.all');
    const users = typeEl.querySelector('.users');
    const orgs = typeEl.querySelector('.orgs');
    const vacs = typeEl.querySelector('.vacs');

    search.addEventListener('input', searchEvent(this));
    const findEvent = clickEvent(this);
    this.doSearch = findEvent;
    search.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        findEvent(e);
      }
    });
    click.addEventListener('click', findEvent);
    all.addEventListener('click', setTypeEvent(this, ''));
    users.addEventListener('click', setTypeEvent(this, 'person'));
    orgs.addEventListener('click', setTypeEvent(this, 'organization'));
    vacs.addEventListener('click', setTypeEvent(this, 'vacancy'));

    const type =location.pathname.includes('/vacancies') ? 'vacancy' :
      location.pathname.includes('/organizations') ? 'organization' :
        location.pathname.includes('/users') ? 'person' : '';
    search.firstChild.firstChild.value = this.props.getStore().bar.raw.requestBody || '';
    this.props.setStore((s) => ({
      bar: {
        ...s.bar,
        raw: {
          type: type,
          since: 0,
          desc: (s.bar.raw.desc || ''),
          requestBody: (s.bar.raw.requestBody || ''),
        },
      },
    }));

    if (!type) {
      all.classList.add('selected');
    } else if (type === 'person') {
      users.classList.add('selected');
    } else if (type === 'organization') {
      orgs.classList.add('selected');
    } else if (type === 'vacancy') {
      vacs.classList.add('selected');
    }
    findEvent();
  }
}

Bar = withLocalStore(Bar);
export {
  Bar,
};
