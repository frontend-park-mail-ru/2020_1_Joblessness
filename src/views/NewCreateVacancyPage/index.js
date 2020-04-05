import './style.sass';
import {Page} from '../../Page.js';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import {getOrgId} from '../OrganizationPage/getOrgInfo';
import {requestManager, uuid} from '../../ulils';
import {Navigator} from '../../Navigator';
import withLocalStore from './localStore';
import {ORGANIZATION} from '../../CONSTANTS';
import {getVacId} from './getVacId';
/**
 * Vacancy creation page
 */
class CreateVacancyPage extends Page {
  #prevOrg
  /**
   * @return {string} - page to render
   */
  render() {
    let buttonText = 'Откликнуться на вакансию';
    if(/\/vacancies\/create/.test(location.pathname) &&
      currentSession.user.role === ORGANIZATION )
      buttonText = 'Сохранить и опубликовать';
    else if(currentSession.user.role === ORGANIZATION &&
        this.props.getStore().organization.id === currentSession.user.id)
      buttonText = 'Удалить вакансию';
    else if(currentSession.user.role === ORGANIZATION &&
      this.props.getStore().organization.id !== currentSession.user.id)
      buttonText = '';
    return template({
      ...this.props.inputFields,
      buttonText,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const orgId = getOrgId();
    if(/\/vacancies\/create/.test(location.pathname) &&
      currentSession.user.role === ORGANIZATION) {
      console.log('org create vac')
      if(this.#prevOrg !== orgId) {
        console.log('this.#prevOrg !== orgId')
        this.#prevOrg = orgId;
        this.props.reloadStore();
        this.props.random = uuid();
        Navigator.updateAllPages();
        requestManager.tryGetOrg(orgId)
          .then( async (r) => {
            const res = await r.json();

            this.props.reloadStore();
            this.props.setStore(s => ({
              organization: {
                tag: '',
                ...res
              },
            }));
            Navigator.updateAllPages();
          })
          .catch(console.log)
      }
    } else if(/\/vacancies\/create/.test(location.pathname)) {
      // Navigator.showPage('404');
    }
    if(currentSession.user.role !== ORGANIZATION) {
      //@TODO try to load existing vacancy
      requestManager.tryGetVacancy(getVacId())
        .then(async r => {
          const res = await r.json();
          const vac = {
            responsibilities: JSON.parse(res.responsibilities.replace(/&#34;/g, '"')),
            conditions: JSON.parse(res.conditions.replace(/&#34;/g, '"')),
            keywords: JSON.parse(res.keywords.replace(/&#34;/g, '"')),
          };
          this.props.setStore(s => ({
            organization: res.organization,
            requirements: {
              preview: [],
              raw: [],
            },
            ...vac,
          }))
        })
        .catch(r => {
          if(r.status === 404) {
            // Navigator.showPage('404');
          }
          console.log(r)
          // alert('Невозможно соединиться с сервером');
          // Navigator.showPage('/');
        })
    }
    addButtonEvents(this)
  }
}
const addButtonEvents = (page) => {
  if(/\/vacancies\/create/.test(location.pathname) &&
    currentSession.user.role === ORGANIZATION ) {
    const but = document.getElementById('create_vacancy_button');
    but.addEventListener('click', () => {
      const vac = page.props.getStore();
      console.log('vac', vac);
      requestManager.tryCreateVacancy({
        name: uuid(),
        description: '',
        'salary_from': 0.00,
        'salary_to': 10000.00,
        'with_tax': false,
        responsibilities: JSON.stringify(vac.responsibilities),
        conditions: JSON.stringify(vac.conditions),
        keywords: JSON.stringify(vac.keywords),
      }).then(
        async (r) => {
          try {
            console.log('r', r);
            const res = await r.json();
            console.log('res', res);
            Navigator.showPage(`/vacancies/${res.id}`);
          } catch (e) {
            Navigator.showPage(`/organizations/${getOrgId()}`);
          }
        }
      ).catch((r) => {
        alert('Невозможно создать вакансию');
        console.log(r)
      })
    })
  }
  else if(currentSession.user.role === ORGANIZATION &&
    page.props.getStore().organization.id === currentSession.user.id) {

    const but = document.getElementById('create_vacancy_button');
    but?.addEventListener('click', () => {
      requestManager.tryDeleteVacancy(getVacId())
        .then(() => {
          Navigator.showPage(`/organizations/${getOrgId()}`);
        })
        .catch((e) => {
          console.log(e)
          alert('Невозможно удалить вакансию')
        })
    })
  } else if(currentSession.user.role === ORGANIZATION &&
    page.props.getStore().organization.id !== currentSession.user.id) {
    // Do nothing
  } else {
    //@TODO создать отклик
    const but = document.getElementById('create_vacancy_button');
    but.addEventListener('click', () => {
      console.log('res')
      // requestManager.try
    })
  }
}
CreateVacancyPage = withLocalStore(CreateVacancyPage);
CreateVacancyPage = withAuthManager(CreateVacancyPage);
export {
  CreateVacancyPage,
};
