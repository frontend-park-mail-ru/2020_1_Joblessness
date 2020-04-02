import './style.sass';
import {Page} from '../../Page.js';
import template from './index.pug';
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

export {
  CreateVacancyPage,
};
