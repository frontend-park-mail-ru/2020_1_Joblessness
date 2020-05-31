import {Page} from '../../../../Page';
import template from './index.pug'
import withLocalStore from '../../localStore';
import {equals} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';
import {ORGANIZATION} from '../../../../CONSTANTS';

class Display extends Page {
  #oldLen;
  render() {
    return template({
      ...this.props.getStore().messenger,
      isOrg: currentSession.user.role === ORGANIZATION
    })
  }
  componentDidMount() {
    if(!this.#oldLen)
      this.#oldLen = this.props.getStore().messenger.messages.length;
    super.componentDidMount();
    if(this.#oldLen === this.props.getStore().messenger.messages.length - 1) {
      document.querySelector('#chat_dialog').scrollTo(0, 100000)
    }
    this.#oldLen = this.props.getStore().messenger.messages.length;
  }
}

Display = withLocalStore(Display, {
  updateDisplay: (page, oldS, newS) => {
    if (!equals(oldS.messenger.messages, newS.messenger.messages)) {
      page.needUpdate();
      Navigator.updateAllPages();
    }
  }
});

export const CONTAINER = '#chat_dialog'
export const ROOT_ELEMENT = new Display(CONTAINER);
const Routes = [
  {
    path: 'dialog',
    alwaysOn: true,
    element: ROOT_ELEMENT,
  }
];

export default Routes