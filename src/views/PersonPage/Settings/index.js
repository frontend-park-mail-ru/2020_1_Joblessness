import {Page} from '../../../Page';
import template from './index.pug';
import withLocalStore from '../localStore';

/**
 * User settings subpage
 */
class SettingsPage extends Page {
  /**
   * settings page
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

SettingsPage = withLocalStore(SettingsPage);

export {SettingsPage};
