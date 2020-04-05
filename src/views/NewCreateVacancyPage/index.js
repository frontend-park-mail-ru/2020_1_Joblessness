import './style.sass';
import {Page} from '../../Page.js';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import {getOrgId} from '../OrganizationPage/getOrgInfo';
import {requestManager, uuid} from '../../ulils';
import {Navigator} from '../../Navigator';
import withLocalStore from './localStore';
import {ORGANIZATION, UNAUTHORISED} from '../../CONSTANTS';
import {getVacId} from './getVacId';
import {get} from '../../ulils/request';
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

  componentWillMount() {
    super.componentWillMount();
    this.props.reloadStore();
  }

  componentDidMount() {
    super.componentDidMount();
    addButtonEvents(this);
    const orgId = getOrgId();
    if(/\/vacancies\/create/.test(location.pathname) &&
      currentSession.user.role === ORGANIZATION) {
      console.log('org create vac')
      if(this.#prevOrg !== orgId) {
        console.log('this.#prevOrg !== orgId')
        this.#prevOrg = orgId;
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
            Navigator.showPage('404');
          }
          console.log(r)
          // alert('Невозможно соединиться с сервером');
          // Navigator.showPage('/');
        })
    }
  }
}
const addButtonEvents = (page) => {
  if(/\/vacancies\/create/.test(location.pathname) &&
    currentSession.user.role === ORGANIZATION ) {
    const but = document.getElementById('create_vacancy_button');
    but.addEventListener('click', () => {
      const vac = page.props.getStore();
      console.log({
        name: uuid(),
        description: '',
        salaryFrom: 0.00,
        salaryTo: 10000.00,
        withTax: false,
        responsibilities: JSON.stringify(vac.responsibilities),
        conditions: JSON.stringify(vac.conditions),
        keywords: JSON.stringify(vac.keywords),
      })
      requestManager.tryCreateVacancy({
        name: uuid(),
        description: '',
        salaryFrom: 0.00,
        salaryTo: 10000.00,
        withTax: false,
        responsibilities: JSON.stringify(vac.responsibilities),
        conditions: JSON.stringify(vac.conditions),
        keywords: JSON.stringify(vac.keywords),
      }).then(
        async (r) => {
          try {
            const res = await r.json();
            this.props.setStore({
              responsibilities: {
                preview: [],
                raw: [],
              },
              conditions: {
                preview: [],
                raw: [],
              },
              keywords: {
                preview: [],
                raw: [],
              },
            });
            setTimeout(() => {
              localStorage.removeItem(`vacancies/create`);
            }, 100);
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
          localStorage.removeItem(`vacancies/${getVacId()}`);
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
      if(currentSession.user.role === UNAUTHORISED) {
        Navigator.showPage('/signup/start');
        return;
      }
      Navigator.showPage(`/vacancies/${getVacId()}/response`)
    })
  }
}
CreateVacancyPage = withLocalStore(CreateVacancyPage);
CreateVacancyPage = withAuthManager(CreateVacancyPage);
export {
  CreateVacancyPage,
};
