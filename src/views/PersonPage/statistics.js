import './style.sass';
import {Page} from '../../Page';
import template from './pug/sub/statistics.pug';

/**
 * User statistics subpage
 */
class StatisticsSubPage extends Page {
  /**
   * returns statistics page
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {StatisticsSubPage};
