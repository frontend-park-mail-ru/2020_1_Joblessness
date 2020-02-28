import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendNetwork} from './appendNetwork';

/**
 * смотри пояснения к резюме
 */
class VacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template({vacancy: this.props.vacancy});
  }
}
// load vacancy on page load
VacancyPage = appendNetwork(VacancyPage);

export {
  VacancyPage,
};
