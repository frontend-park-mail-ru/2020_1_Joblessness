import {Page} from '../../Page';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import withLocalStore, {getSumId} from './localStore';
import {request, requestManager, uuid} from '../../ulils';
import {getUserId} from '../NewUserPage/getUserId';
import {Navigator} from '../../Navigator';
import {isCreationPage} from './Education/routes';
import {PERSON} from '../../CONSTANTS';


class SummaryPage extends Page {
  #submitText;

  render() {
    return template({
      ...this.props,
      submitText: this.#submitText,
    });
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    if (!isCreationPage())
      loadSummary(this);
    else
      this.props.reloadStore();

    if (isCreationPage()) {
      if (currentSession.user.role === PERSON) {
        this.#submitText = 'Создать резюме'
      } else {
        this.#submitText = ''
      }
    } else {
      if (currentSession.user.id === this.props.getStore().user.id) {
        this.#submitText = 'Удалить резюме'
      } else {
        this.#submitText = ''
      }
    }
  }

  componentDidMount() {
    super.componentDidMount();

    if (isCreationPage()) {
      if (currentSession.user.role === PERSON) {
        loadUser(this);
        initCreateEvent(this);
      } else {
        alert('Авторизируйтесь как соискатель');
        setTimeout(() => Navigator.showPage('/'), 100);

      }
    } else {
      if (currentSession.user.id === this.props.getStore().user.id) {
        initDeleteEvent(this);
      }
    }
  }
}

const initDeleteEvent = (page) => {
  document
    .querySelector('#create_summary_button')
    .addEventListener('click', (e) => {
      requestManager.tryDeleteSummary(getSumId())
        .then(
          async (r) => {
            alert('Резюме удалено');
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

      if (!validateState(state)) {
        alert('Не все поля верно заполнены');
        return;
      }
      const body = {
        name: state.mainInfo.preview.name.trim(),
        description: state.mainInfo.preview.description.trim(),
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
      console.log(body);

      request.post('/api/summaries', body).then(
        async (r) => {
          const res = await r.json();
          console.log(res);
          alert('Резюме усепшно создано');
          this.props.resetStore();
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
      // page.props.random = uuid();
      // Navigator.updateAllPages();
    })
    .catch(console.log);
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
  console.log(state);
  if (isNaN(state.mainInfo.preview.salaryFrom))
    return false;
  if (isNaN(state.mainInfo.preview.salaryTo))
    return false;
  for (let edu of state.education.preview) {
    for (let c in edu.correct) {
      console.log(edu.correct[c]);
      if (!edu.correct[c]) return false;
    }
  }
  for (let exp of state.experience.preview) {
    for (let c in exp.correct) {
      console.log(exp.correct[c]);
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
        description: sum.description,
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
        user: sum.author,
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
        page.props.random = uuid();
        Navigator.updateAllPages();
      })
    })
};
SummaryPage = withLocalStore(SummaryPage);
SummaryPage = withAuthManager(SummaryPage);
export {
  SummaryPage,
};
