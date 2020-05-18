import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import template from './index.pug'
import './style.sass'
class Messenger extends Page {
  render() {
    return template(this.props)
  }
}

Messenger = withLocalStore(Messenger, {
  updateMessenger: (page, oldS, newS) => {
    if(oldS.currentPage !== newS.currentPage &&
      newS.currentPage === 'messenger') {
      page.needUpdate()
    }
  }
});
export {
  Messenger
}