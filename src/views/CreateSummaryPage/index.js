import {Page} from '../../Page';
import template from './index.pug';
import {withAuthManager} from '../../ulils/AuthManager';
import withLocalStore from './localStore';
import {request, requestManager} from '../../ulils';
import {getUserId} from '../NewUserPage/getUserId';
import {Navigator} from '../../Navigator';

class SummaryPage extends Page {
  render() {
    return template(this.props);
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    // this.props.reloadStore();
  }

  componentDidMount() {
    super.componentDidMount();
    loadUser(this);
    document
      .querySelector('#create_summary_button')
      .addEventListener('click', (e) => {
        const state = this.props.getStore();

        if(!validateState(state)) {
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
            Navigator.showPage(`/summaries/${res.id}`);
          }
        )
          .catch((e) => {
            alert('Не удалось создать резюме');
            console.log(e)
          });
      });
  }
}

const loadUser = (page) => {
  requestManager.tryGetPerson(getUserId())
    .then(async (r) => {
      const user = await r.json();
      page.props.setStore((s) => ({
        user: {
          ...user,
        },
      }));
      Navigator.updateAllPages();
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
  console.log(state)
  if(isNaN(state.mainInfo.preview.salaryFrom))
    return false;
  if(isNaN(state.mainInfo.preview.salaryTo))
    return false;
  for(let edu of state.education.preview) {
    for(let c in edu.correct) {
      console.log(edu.correct[c])
      if(!edu.correct[c]) return false;
    }
  }
  for(let exp of state.experience.preview) {
    for(let c in exp.correct) {
      console.log(exp.correct[c]);
      if(!exp.correct[c]) return false;
    }
  }
  return true;
};
SummaryPage = withLocalStore(SummaryPage);
SummaryPage = withAuthManager(SummaryPage);
export {
  SummaryPage,
};
