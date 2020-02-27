import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {appendWithNetwork} from './appendWithNetwork';
import {appendEvents} from './appendEvents';

/**
 * UserPage class itself returns only html elements
 * userData - user info loaded from server
 * events - events attached to page
 */
class UserPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template({
      ...this.props.userData,
      events: this.props.events,
    });
  }
}
// load user data on page load
UserPage = appendWithNetwork(UserPage);
// settings
UserPage = appendEvents(UserPage);
export {
  UserPage,
};
