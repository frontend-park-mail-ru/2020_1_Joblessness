import './style.sass';
import {Page} from '../../Page';
import template from './pug/sub/settings.pug';

/**
 * User settings subpage
 */
class SettingsSubPage extends Page {
  /**
   * settings page
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

export {SettingsSubPage};
