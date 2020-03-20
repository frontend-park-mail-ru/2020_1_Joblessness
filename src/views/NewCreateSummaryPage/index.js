import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {uuid, withChainedPages} from '../../ulils';
import {AddEducation} from './addEducation';
import {ShowEducationPage} from './ShowEducation';
import {PersonInfo} from './personInfo';
import {ShowExperiencePage} from './showExperience';
import {AddExperienceRoute} from './addExperience/AddExperienceRoute';

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
    path: 'info',
    next: '',
    alwaysOn: true,
    element: new PersonInfo('#create_summary_person_info')
  },
  {
    path: 'addEducation',
    next: '',
    innerNext: 'showEducation',
    alwaysOn: true,
    innerPath: 'addEducation',
    element: new AddEducation('#create_summary_add_education'),
  },
  AddExperienceRoute,
  {
    path: 'showEducation',
    next: '',
    alwaysOn: true,
    innerPath: 'showEducation',
    element: new ShowEducationPage('#create_summary_show_education'),
  },
  {
    path: 'any',
    next: '',
    innerPath: 'showExperience',
    element: new ShowExperiencePage('#create_summary_show_experience')
  },
];
CreateSummaryPage = withChainedPages(CreateSummaryPage,
  CreateSummaryRoutes, null, '/summaries/create/',);
export {
  CreateSummaryPage,
  CreateSummaryRoutes,
};
