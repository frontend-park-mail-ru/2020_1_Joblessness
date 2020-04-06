import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';

/**
 * Vacancies subpage
 */
class SummariesList extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {
  SummariesList,
};
