import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendNetwork} from './appendNetwork';
import {uuid, withEvents} from '../../ulils';
import {print} from './print';

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

SummaryPage = withEvents(SummaryPage, 'events', {
  print: {
    id: uuid(),
    eventName: 'click',
    event: print,
  }
});
export {
  SummaryPage,
};
