import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendForm} from './appendForm';
/**
 * Vacancy creation page
 */
class CreateVacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}
// Form validation and request
CreateVacancyPage = appendForm(CreateVacancyPage);

export {
  CreateVacancyPage,
};
