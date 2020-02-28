import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendNetwork} from './appendNetwork';

/**
 * summary page
 */
class SummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props);
  }
}
// load summary on load
SummaryPage = appendNetwork(SummaryPage);

export {
  SummaryPage,
};
