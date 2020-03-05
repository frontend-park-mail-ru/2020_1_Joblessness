import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendForm} from './appendForm';
import {withChainedPages} from '../../ulils';
import {AddEducation} from './AddEducation';
import {ShowEducationPage} from './ShowEducation';
import {PersonInfo} from './PersonInfo';

/**
 * summary creation forms
 */
class CreateSummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props.inputFields);
  }
}
const CreateSummaryRoutes = [
  {
    path: 'any',
    next: '',
    element: new AddEducation('#create_summary_add_education'),
  },
  {
    path: 'any',
    next: '',
    element: new ShowEducationPage('#create_summary_show_education'),
  },
  {
    path: 'any',
    next: '',
    element: new PersonInfo('#create_summary_person_info'),
  },
];
CreateSummaryPage = withChainedPages(CreateSummaryPage, CreateSummaryRoutes);
// CreateSummaryPage = appendForm(CreateSummaryPage);
export {
  CreateSummaryPage,
  CreateSummaryRoutes,
};
