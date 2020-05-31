import './style.sass';
import {Page} from '../../Page.js';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import {requestManager, uuid} from '../../ulils';
import {Navigator} from '../../Navigator';
import withLocalStore from './localStore';
import {ORGANIZATION, PERSON, UNAUTHORISED} from '../../CONSTANTS';
import {getVacId} from './getVacId';
import {isCreationPage} from '../SummaryPage/Education/routes';
import Share from '../../ulils/share';
import {getSumId} from '../SummaryPage/localStore';

/**
 * Vacancy creation page
 */
class CreateVacancyPage extends Page {
  /**
   * @return {string} - page to render
   */
  #submitText;

  render() {
    return template({
      link : isCreationPage() ? null : currentSession.user.id === this.props.getStore().organization.id ? null : `/organizations/${this.props.getStore().organization.id}`,
      ...this.props.inputFields,
      submitText: this.#submitText,
    });
  }


  componentWillUpdate() {
    super.componentWillUpdate();
    if (!isCreationPage())
      loadVacancy(this);
    else
      this.props.reloadStore();

    if (isCreationPage()) {
      if (currentSession.user.role === ORGANIZATION) {
        this.#submitText = 'Создать вакансию'
      } else {
        this.#submitText = ''
      }
    } else {
      if (currentSession.user.id === this.props.getStore().organization.id) {
        this.#submitText = 'Удалить вакансию'
      } else {
        if (currentSession.user.role !== ORGANIZATION) {
          this.#submitText = 'Откликнуться на вакансию'
        } else {
          this.#submitText = 'Поделиться ВКонтакте'
        }
      }
    }
  }

  componentDidMount() {
    super.componentDidMount();
    if (isCreationPage()) {
      if (currentSession.user.role === ORGANIZATION) {
        loadOrg(this);
        initCreateEvent(this);
      } else {
        alert('Авторизируйтесь как организация');
        setTimeout(() => Navigator.showPage('/'), 100);
      }
    } else {
        if (currentSession.user.id === this.props.getStore().organization.id) {
          initDeleteEvent(this);
        } else {
          if(currentSession.user.role === PERSON) {
            initResponseEvent(this);
          } else if(currentSession.user.role === UNAUTHORISED){
            initSignUpEvent(this);
          } else {
            initShareEvent(this);
          }
        }
    }
  }
}

const initShareEvent = (page) => {
  const store = page.props.getStore();
  const info = store.mainInfo.preview;

  document
    .querySelector('#create_vacancy_button')
    .addEventListener('click', (e) => {
      Share.vkontakte(`https://hahao.ru/summaries/${getSumId()}`,
        `Вакансия "${info.name}" на сайте HaHaO.RU,
с зарплатой от ${info.salaryFrom} до ${info.salaryTo} руб.`,
        store.organization.avatar)
    })
}

let lastLoaded;
const loadVacancy = page => {
  if (lastLoaded === getVacId()) {
    return;
  }
  lastLoaded = getVacId();
  requestManager
    .tryGetVacancy(getVacId())
    .then(async r => {
      const vac = await r.json();
      const responsibilities = JSON.parse(vac.responsibilities.replace(/&#34;/g, '"'));
      const conditions = JSON.parse(vac.conditions.replace(/&#34;/g, '"'));
      const mainInfo = {
        name: vac.name || '',
        description: vac.description || '',
        salaryFrom: vac.salaryFrom || '',
        salaryTo: vac.salaryTo || '',
      };
      page.props.setStore({
        organization: vac.organization,
        mainInfo: {
          raw: mainInfo,
          preview: mainInfo,
        },
        responsibilities: {
          raw: responsibilities,
          preview: responsibilities,
        },
        conditions: {
          raw: conditions,
          preview: conditions,
        }
      }, () => {
        page.props.random = uuid();
        Navigator.updateAllPages();
      })
    })
    .catch(r => {
      if(r.status === 404 || r.status === 500) {
        Navigator.showPage('404');
        return;
      }
    })
};
const loadOrg = (page) => {
  requestManager
    .tryGetOrg(currentSession.user.id)
    .then(async r => {
      const org = await r.json();

      page.props.setStore({
        organization: {
          ...org,
        }
      });
      Navigator.updateAllPages();
    })
    .catch((r) => {
      if(r.status === 404 || r.status === 500) {
        Navigator.showPage('404');
        return;
      }
      alert('Невозможно загрузить информацию об организации')
    });
};
const initSignUpEvent = (page) => {
  document
    .getElementById('create_vacancy_button')
    ?.addEventListener(
      'click',
      () => {
        Navigator.showPage('/signup')
      }
    )
}
const initResponseEvent = (page) => {
  document
    .getElementById('create_vacancy_button')
    ?.addEventListener(
      'click',
      () => {
        Navigator.showPage(`/vacancies/${getVacId()}/response`);
      }
    )
}
const initCreateEvent = page => {
  document
    .getElementById('create_vacancy_button')
    ?.addEventListener(
      'click',
      e => {
        const state = page.props.getStore();
        const raw = state.mainInfo.preview;
        const body = {
          name: state.mainInfo.preview.name,
          description: state.mainInfo.preview.description || '',
          salaryFrom: Number(state.mainInfo.preview.salaryFrom),
          salaryTo: Number(state.mainInfo.preview.salaryTo),
          responsibilities: JSON.stringify(state.responsibilities.preview),
          conditions: JSON.stringify(state.conditions.preview),
        };
        let valid = true;
        if(!body.name || body.name.length > 30) {
          valid = false;
          alert('Поле "Название" вакансии заполнено неверно')
        }
        if(body.description.length > 50) {
          valid = false;
          alert('Поле "Описание" вакансии заполнено неверно')
        }
        if(isNaN(body.salaryFrom) || !body.salaryFrom || body.salaryFrom > Number.MAX_SAFE_INTEGER) {
          valid = false;
          alert('Поле "Минимальная зарплата" заполнено неверно')
        }
        if(isNaN(body.salaryTo) || !body.salaryTo || body.salaryTo > Number.MAX_SAFE_INTEGER) {
          valid = false;
          alert('Поле "Максимальная зарплата" заполнено неверно')
        }
        if(body.salaryTo < body.salaryFrom) {
          valid = false;
          alert('Минимальная зарплата не может быть больше максимальной')
        }
        const buttons = document.querySelectorAll('.edit-button')
        if(buttons.length < 2) {
          valid = false;
          alert('Сохраните изменения перед созданием вакансии')
        }
        if(!valid) {
          return;
        }
        requestManager
          .tryCreateVacancy(body)
          .then(async(r) => {
            const res = await r.json();
            alert('Вакансия успешно создана','success');
            page.props.setStore({
              responsibilities: {
                preview: [],
                raw: [],
              },
              conditions: {
                preview: [],
                raw: [],
              },
              mainInfo: {
                raw: {
                  name: '',
                  description: '',
                  salaryFrom: '',
                  salaryTo: '',
                },
                preview: {
                  name: '',
                  description: '',
                  salaryFrom: '',
                  salaryTo: '',
                }
              },
            });
            Navigator.showPage(`/vacancies/${res.id}`);
          })
          .catch(() => {
            alert('Невозможно создать вакансию. Повторите позднее')
          })
      }
    )
};
const initDeleteEvent = page => {
  document
    .getElementById('create_vacancy_button')
    ?.addEventListener('click', (e) => {
      requestManager
        .tryDeleteVacancy(getVacId())
        .then(() => {
          Navigator.showPage(`/organizations/${currentSession.user.id}`);
          lastLoaded = null
          alert('Вакансия успешно удалена','success');
          return;
        })
        .catch(() => alert('Невозможно удалить вакансию'))
    })
};

CreateVacancyPage = withLocalStore(CreateVacancyPage);
CreateVacancyPage = withAuthManager(CreateVacancyPage);
export {
  CreateVacancyPage,
};
