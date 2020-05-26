import {Page} from '../../Page';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import withLocalStore, {getSumId} from './localStore';
import {request, requestManager, uuid} from '../../ulils';
import {getUserId} from '../PersonPage/getUserId';
import {Navigator} from '../../Navigator';
import {isCreationPage} from './Education/routes';
import {ORGANIZATION, PERSON} from '../../CONSTANTS';
import Share from '../../ulils/share';

class SummaryPage extends Page {
  #submitText;

  render() {
    return template({
      link: isCreationPage() ? null : this.props.getStore().user.id === currentSession.user.id ? null : `/users/${this.props.getStore().user.id}`,
      ...this.props,
      id: getSumId(),
      submitText: this.#submitText,
    });
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    if (!isCreationPage()) {
      console.log('load');
      loadSummary(this);
    } else
      this.props.reloadStore();

    if (isCreationPage()) {
      lastLoaded = null;
      if (currentSession.user.role === PERSON) {
        this.#submitText = 'Создать резюме'
      } else {
        this.#submitText = ''
      }
    } else {
      if (currentSession.user.id === this.props.getStore().user.id) {
        this.#submitText = 'Удалить резюме'
      } else {
        this.#submitText = 'Поделиться ВКонтакте'
      }
    }
  }

  componentDidMount() {
    super.componentDidMount();

    if (isCreationPage()) {
      if (currentSession.user.role === PERSON) {
        if (currentSession.user.id !== this.props.getStore().user.id) {
          loadUser(this);
        }
        initCreateEvent(this);
      } else {
        alert('Авторизируйтесь как соискатель');
        setTimeout(() => Navigator.showPage('/'), 100);
      }
    } else {
      if (currentSession.user.id === this.props.getStore().user.id) {
        initDeleteEvent(this);
      } else {
        console.log(this.props.getStore())
        initShareEvent(this);
      }
    }
  }
}

const initShareEvent = (page) => {
  const store = page.props.getStore();
  const info = store.mainInfo.preview;
  const exp = store.experience.preview.length ? ', опытом работы' : '';
  const ed = store.education.preview.length ? exp ? ' и образованием.' : ', образованием.' : '';
  document
    .querySelector('#create_summary_button')
    .addEventListener('click', (e) => {
      Share.vkontakte(`https://hahao.ru/summaries/${getSumId()}`,
        `Резюме "${info.name}" на сайте HaHaO.RU,
с желаемой зарплатой от ${info.salaryFrom} до ${info.salaryTo} руб${!(exp || ed) ? '.' : ''}${exp}${exp && !ed ? '.' : ''}${ed}`,
        store.user.avatar)
    })
}
const initDeleteEvent = (page) => {
  document
    .querySelector('#create_summary_button')
    .addEventListener('click', (e) => {
      requestManager.tryDeleteSummary(getSumId())
        .then(
          async (r) => {
            alert('Резюме удалено','success');
            Navigator.showPage(`/users/${getUserId()}`);
          }
        )
        .catch((e) => {
          alert('Не удалось удалить резюме');
          console.log(e)
        });
    });
};
const initCreateEvent = (page) => {
  document
    .querySelector('#create_summary_button')
    .addEventListener('click', (e) => {
      const state = page.props.getStore();
      let valid = true;
      if (isNaN(state.mainInfo.preview.salaryFrom) || state.mainInfo.preview.salaryFrom === '') {
        valid = false;
        alert('Не верно указана минимальная заработная плата')
      }
      if (isNaN(state.mainInfo.preview.salaryTo) || state.mainInfo.preview.salaryTo === '') {
        valid = false;
        alert('Не верно указана максимальная заработная плата')
      }
      if (state.mainInfo.preview.salaryFrom > state.mainInfo.preview.salaryTo) {
        valid = false;
        alert('Минимальная заработная плата не может быть больше максимальной')
      }
      if (!state.mainInfo.preview.name.length > 25 || state.mainInfo.preview.name.length < 1) {
        valid = false;
        alert('Не верно указано название резюме');
      }
      const buttons = document.querySelectorAll('.edit-button');
      if(buttons.length < 2) {
        alert('Сохраните изменения перед созданием резюме');
        valid = false;
      }
      // return true;
      if (!valid || !validateState(state)) {
        return;
      }
      const body = {
        name: state.mainInfo.preview.name.trim(),
        salaryFrom: Number(state.mainInfo.preview.salaryFrom),
        salaryTo: Number(state.mainInfo.preview.salaryTo),
        keywords: createKeyWords(state),
        educations: state.education.preview.map((e) => ({
          institution: e.institution,
          speciality: e.speciality,
          graduated: new Date(e.graduated).toISOString(),
          type: e.type,
        })),
        experiences: state.experience.preview.map((e) => ({
          companyName: e.companyName,
          role: e.role,
          responsibilities: e.responsibilities,
          start: new Date(e.experienceFrom).toISOString(),
          stop: new Date(e.experienceTo).toISOString(),
        })),
      };

      request.post('/api/summaries', body).then(
        async (r) => {
          const res = await r.json();
          alert('Резюме усепшно создано','success');
          page.props.setStore({
            mainInfo: {
              raw: {
                name: '',
                salaryFrom: '',
                salaryTo: '',
              },
              preview: {
                name: '',
                salaryFrom: '',
                salaryTo: '',
              },
            },
            experience: {
              preview: [],
              raw: [],
            },
            education: {
              preview: [],
              raw: [],
            },
            keywords: {
              preview: [],
              raw: [],
            },
          });
          Navigator.showPage(`/summaries/${res.id}`);
        }
      )
        .catch((e) => {
          alert('Не удалось создать резюме');
          console.log(e)
        });
    });
};
const loadUser = (page) => {
  requestManager.tryGetPerson(getUserId())
    .then(async (r) => {
      const user = await r.json();
      page.props.setStore((s) => ({
        user: {
          ...user,
        },
      }));
      page.needUpdate();
      Navigator.updateAllPages();
    })
    .catch(() => {
      alert('Невозможно получить данные пользователя')
    });
};

const createKeyWords = (state) => {
  let words = '';
  words += state.mainInfo.preview.name + ',';
  words += state
    .education
    .preview
    .reduce((acc, w) => acc + w.institution + ',' + w.speciality + ',', '');

  words += state
    .experience
    .preview
    .reduce((acc, w) => acc + w.companyName + ','
      + w.role + ',' + w.responsibilities + ',', '');

  return words
};


const validateState = (state) => {
  if (isNaN(state.mainInfo.preview.salaryFrom))
    return false;
  if (isNaN(state.mainInfo.preview.salaryTo))
    return false;
  for (let edu of state.education.preview) {
    for (let c in edu.correct) {
      if (!edu.correct[c]) return false;
    }
  }
  for (let exp of state.experience.preview) {
    for (let c in exp.correct) {
      if (!exp.correct[c]) return false;
    }
  }
  return true;
};

let lastLoaded;
const loadSummary = (page) => {

  if (lastLoaded === getSumId()) {
    return;
  }
  lastLoaded = getSumId();
  requestManager
    .tryGetSummary(getSumId())
    .then(async r => {
      const sum = await r.json();
      const mainInfo = {
        name: sum.name,
        salaryFrom: sum.salaryFrom,
        salaryTo: sum.salaryTo,
      };
      const education = sum.educations?.map(e => ({
        id: uuid(),
        institution: e.institution,
        speciality: e.speciality,
        graduated: new Date(e.graduated).getFullYear(),
        type: e.type,
        correct: {
          institution: true,
          speciality: true,
          graduated: true,
          type: true,
        }
      })) ?? [];
      const experience = sum.experiences?.map(e => ({
        id: uuid(),
        companyName: e.companyName,
        role: e.role,
        experienceFrom: new Date(e.start).getFullYear(),
        experienceTo: new Date(e.stop).getFullYear(),
        responsibilities: e.responsibilities,
        correct: {
          companyName: true,
          role: true,
          experienceFrom: true,
          experienceTo: true,
          responsibilities: true,
        },
      })) ?? [];
      page.props.setStore(s => ({
        user: sum.author,
        mainInfo: {
          preview: mainInfo,
          raw: mainInfo,
        },
        education: {
          preview: education,
          raw: education,
        },
        experience: {
          preview: experience,
          raw: experience,
        }
      }), () => {
        page.needUpdate();
        Navigator.updateAllPages();
      })
    })
    .catch(r => {
      if (r.status === 404) {
        Navigator.showPage('404');
      }
    })
};
SummaryPage = withLocalStore(SummaryPage);
SummaryPage = withAuthManager(SummaryPage);
export {
  SummaryPage,
};
