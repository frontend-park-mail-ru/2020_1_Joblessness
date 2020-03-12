import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {withChainedPages} from '../../ulils';
import {AddEducation} from './addEducation';
import {ShowEducationPage} from './ShowEducation';
import {PersonInfo} from './personInfo';
import {ShowExperiencePage} from './showExperience';
import {AddExperiencePage} from './addExperience';

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
const CreateSummaryRoutes = [
  {
    path: 'any',
    next: '',
    element: new PersonInfo('#create_summary_person_info')
  },
  {
    path: 'any',
    next: '',
    innerNext: 'showEducation',
    innerPath: 'addEducation',
    element: new AddEducation('#create_summary_add_education'),
  },
  {
    path: 'any',
    next: '',
    innerPath: 'showEducation',
    element: new ShowEducationPage('#create_summary_show_education'),
  },
  {
    path: 'any',
    next: '',
    innerNext: 'showExperience',
    innerPath: 'addExperience',
    beforeNext: (page, exp) => {
      if(!page.props.expList)
        page.props.expList = [];
      page.props.expList.push(exp);
    },
    element: new AddExperiencePage('#create_summary_add_experience')
  },
  {
    path: 'any',
    next: '',
    innerPath: 'showExperience',
    element: new ShowExperiencePage('#create_summary_show_experience')
  },
];
CreateSummaryPage = withChainedPages(CreateSummaryPage,
  CreateSummaryRoutes, null, '/summaries/create/');
export {
  CreateSummaryPage,
  CreateSummaryRoutes,
};
