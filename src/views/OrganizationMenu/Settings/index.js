import {Page} from '../../../Page';
import template from './index.pug'
import withLocalStore from '../localStore';
import {uuid} from '../../../ulils';

class Settings extends Page {
  render() {
    return template(this.props)
  }
}

Settings = withLocalStore(Settings, {
  updateMessenger: (page, oldS, newS) => {
    if(oldS.currentPage !== newS.currentPage &&
      newS.currentPage === 'settings') {
      page.props.random = uuid();
    }
  }
});

export {
  Settings
}