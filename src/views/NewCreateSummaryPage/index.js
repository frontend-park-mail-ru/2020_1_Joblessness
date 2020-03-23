import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {request, uuid, withChainedPages, withForm} from '../../ulils';

import withLocalStore from './localStore';
import CreateSummaryRoutes from './CreateSummaryRoutes';
/**
 * summary creation forms
 */
class CreateSummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props);
  }
}

CreateSummaryPage = withLocalStore(CreateSummaryPage);

CreateSummaryPage = withForm(CreateSummaryPage, {}, {
  id: uuid(),
},
(e, page) => {
  const state = page.props.getStore();
  const body = {
    keywords: '',
    educations: state.education.map( (e) => ({
      institution: e.institution,
      speciality: e.speciality,
      graduated: '01/01/' + e.graduated,
      type: e.type,
    })),
    experiences: state.experience.map( (e) => ({
      'company_name': e.companyName,
      'role': e.role,
      'responsibilities': e.responsibilities,
      'start': e.experience[0],
      'stop': e.experience[1],
    })),
  };
  console.log(body);
  request.post('/api/summaries', body).then(console.log)
      .catch(console.log);
},
);

CreateSummaryPage = withChainedPages(CreateSummaryPage,
    CreateSummaryRoutes, null, '/summaries/create/');

export {
  CreateSummaryPage,
  CreateSummaryRoutes,
};
