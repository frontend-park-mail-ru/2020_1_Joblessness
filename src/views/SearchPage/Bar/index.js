import {Page} from '../../../Page';
import template from './index.pug';
import './style.sass'
import {uuid} from '../../../ulils';
import {withLocalStore} from '../withLocalStore';
import {requestManager} from '../../../ulils';
import {Navigator} from '../../../Navigator';

/**
 * https://stackoverflow.com/a/10795797
 * @returns {number}
 */
function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  );
}
const loadOnScroll = (page) => {
  const ev = e => {
    if(!document.querySelector('#search_bar')) {
      document.removeEventListener('scroll', ev);
      return;
    }
    if(window.scrollY + window.innerHeight >= getDocHeight()) {
      page.props.setStore(s => ({
        bar: {
          ...s.bar,
          preview: {
            ...s.bar.preview,
            since: Number(s.bar.preview.since) + 1,
          },
        }
      }));
      const {type, since, desc, requestBody} = page.props.getStore().bar.preview;
      Navigator.showPage(window.location.pathname + `?type=${type}&since=${since}&desc=${desc}&request=${requestBody}`, true, false);
      requestManager.trySearch(page.props.getStore().bar.preview)
        .then(async r => {
          const res = await r.json();
          const persons = res.persons?.map(p => ({...p, innerId: uuid()})) ?? [];
          const vacancies = res.vacancies?.map(p => ({...p, innerId: uuid()})) ?? [];
          const organizations = res.organizations?.map(p => ({...p, innerId: uuid()})) ?? [];
          if(persons.length + vacancies.length + organizations.length === 0) {
            page.props.setStore(s => ({
              bar: {
                ...s.bar,
                preview: {
                  ...s.bar.preview,
                  since: Number(s.bar.preview.since) - 1,
                },
              }
            }));
            return;
          }
          page.props.setStore(s => ({
            search: {
              persons: [...s.search.persons, ...persons],
              vacancies: [...s.search.vacancies, ...vacancies],
              organizations: [...s.search.organizations, ...organizations],
            }
          }));
          page.props.requestNextNoUpdate()
        })
        .catch(e => {
          console.log(e)
          alert('Похоже, сервер недоступен')
        })
    }
    // if(e.scrollTop >= e)
  }
  return ev;
}
/**
 * https://stackoverflow.com/a/5448635
 */
function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

/**
 *
 */
function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}

const searchEvent = page => (e) => {
  page.props.setStore(s => ({
    bar: {
      ...s.bar,
      raw: {
        ...s.bar.raw,
        requestBody: e.target.value,
      }
    }
  }))
}

const clickEvent = page => (e) => {
  page.props.setStore(s => ({
    bar: {
      ...s.bar,
      preview: s.bar.raw,
    }
  }));
  const {type, since, desc, requestBody} = page.props.getStore().bar.preview;
  Navigator.showPage(window.location.pathname + `?type=${type}&since=${since}&desc=${desc}&request=${requestBody}`, true, false);
  requestManager.trySearch(page.props.getStore().bar.preview)
    .then(async r => {
      const res = await r.json();
      const persons = res.persons?.map(p => ({...p, innerId: uuid()})) ?? [];
      const vacancies = res.vacancies?.map(p => ({...p, innerId: uuid()})) ?? [];
      const organizations = res.organizations?.map(p => ({...p, innerId: uuid()})) ?? [];
      page.props.setStore({
        search: {
          persons,
          vacancies,
          organizations,
        }
      });
      page.props.requestNextNoUpdate()
    })
    .catch(e => {
      console.log(e)
      alert('Похоже, сервер недоступен')
    })
};

const setTypeEvent = (page, type) => (e) => {
  Array.from(document.querySelectorAll('.selected'))
    .forEach(d => d.classList.remove('selected'));
  e.target.classList.add('selected');
  page.props.setStore(s => ({
    bar: {
      ...s.bar,
      raw: {
        ...s.bar.raw,
        type,
      }
    }
  }));
  page.doSearch(e);
};
class Bar extends Page {
  #wasMounted;
  constructor(props) {
    super(props)
    this.props.searchId = uuid();
    this.props.clickId = uuid();
    this.props.typeId = uuid();
  }
  render() {
    return template(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    const parent = document.querySelector(this.container);
    document.addEventListener('scroll', loadOnScroll(this));
    const search = document.getElementById(this.props.searchId);
    const click = document.getElementById(this.props.clickId);
    const type = document.getElementById(this.props.typeId);

    const all = type.querySelector('.all');
    const users = type.querySelector('.users');
    const orgs = type.querySelector('.orgs');
    const vacs = type.querySelector('.vacs');

    search.addEventListener('input', searchEvent(this));
    const findEvent = clickEvent(this);
    this.doSearch = findEvent;
    search.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        findEvent(e);
      }
    });
    click.addEventListener('click', findEvent)
    all.addEventListener('click', setTypeEvent(this, ''));
    users.addEventListener('click', setTypeEvent(this, 'person'));
    orgs.addEventListener('click', setTypeEvent(this, 'organization'));
    vacs.addEventListener('click', setTypeEvent(this, 'vacancy'));

    if(!this.#wasMounted) {
      this.#wasMounted = true;
      const {type, request, since, desc} = getSearchParameters();

      if(!type && !request && !since && !desc)
        return;

      search.firstChild.firstChild.value = request;
      this.props.setStore(s => ({
        bar: {
          ...s.bar,
          raw: {
            type: type ? type : s.bar.raw.type,
            since: 0,
            desc: desc ? desc :s.bar.raw.desc,
            requestBody: request ? request: s.bar.raw.requestBody,
          }
        }
      }));
      if(type === '')
        all.classList.add('selected');
      else if(type === 'person')
        users.classList.add('selected');
      else if(type === 'organization')
        orgs.classList.add('selected');
      else if(type === 'vacancy')
        vacs.classList.add('selected');
      findEvent(null);
    }
  }
}

Bar = withLocalStore(Bar);
export {
  Bar
}