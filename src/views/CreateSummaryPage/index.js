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
    this.props.reloadStore();
  }

  componentDidMount() {
    super.componentDidMount();
    loadUser(this);
    document
        .querySelector('#create_summary_button')
        .addEventListener('click', (e) => {
          const state = this.props.getStore();
          console.log(this.props.getStore());
          // const body = {
          //   ...state.mainInfo.preview,
          //   keywords: '',
          //   educations: state.education.preview.map( (e) => ({
          //     institution: e.institution,
          //     speciality: e.speciality,
          //     graduated: new Date(e.graduated).toISOString(),
          //     type: e.type,
          //   })),
          //   experiences: state.experience.preview.map( (e) => ({
          //     companyName: e.companyName,
          //     role: e.role,
          //     responsibilities: e.responsibilities,
          //     start: new Date(e.experience[0]).toISOString(),
          //     stop: new Date(e.experience[1]).toISOString(),
          //   })),
          // };
          const body = {
            name: 'name',
            educations: [
              {
                institution: 'МГТУ',
                speciality: 'Физика',
                graduated: new Date(2022).toISOString(),
                type: 'Высшее'
              }
            ],
            experience: [
              {
                companyName: 'Одноклассники',
                role: 'роль',
                responsibilities: 'петь',
                start: new Date(2015).toISOString(),
                stop: new Date(2020).toISOString(),
              }
            ],
          };
          console.log(body);
          request.post('/api/summaries', body).then(console.log)
              .catch(console.log);
        });
  }
}
// (e, page) => {
//   const state = page.props.getStore();
//   console.log(page.props.getStore())
//   const body = {
//     keywords: '',
//     educations: state.education.map( (e) => ({
//       institution: e.institution,
//       speciality: e.speciality,
//       graduated: new Date(e.graduated).toISOString(),
//       type: e.type,
//     })),
//     experiences: state.experience.map( (e) => ({
//       companyName: e.companyName,
//       role: e.role,
//       responsibilities: e.responsibilities,
//       start: new Date(e.experience[0]).toISOString(),
//       stop: new Date(e.experience[1]).toISOString(),
//     })),
//   };
//   console.log(body);
//   request.post('/api/summaries', body).then(console.log)
//     .catch(console.log);
// },
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

SummaryPage = withLocalStore(SummaryPage);
SummaryPage = withAuthManager(SummaryPage);
export {
  SummaryPage,
};
