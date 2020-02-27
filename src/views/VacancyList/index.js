import {Page} from '../../Page';
import template from './pug/index.pug';
import './style.sass';
import {appendNetwork} from './appendNetwork';
import {appendEvents} from './appendEvents';

/**
 * Vacancies
 */
class VacancyListPage extends Page {
  /**
   * @return {string}
   */
  render() {
    return template(this.props);
  }
}

// preload data
VacancyListPage = appendNetwork(VacancyListPage);
// load more vacancies on show-more click
VacancyListPage = appendEvents(VacancyListPage);

export {
  VacancyListPage,
};
