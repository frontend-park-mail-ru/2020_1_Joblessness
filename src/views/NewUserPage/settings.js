import './style.sass'
import {Page} from '../../Page';
import template from './pug/sub/settings.pug'

class SettingsSubPage extends Page {

  render() {
    return template(this.props);
  }
}

export {SettingsSubPage};
