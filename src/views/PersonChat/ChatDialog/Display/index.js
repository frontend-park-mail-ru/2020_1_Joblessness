import {Page} from '../../../../Page';
import template from './index.pug'
import withLocalStore from '../../localStore';
import {equals} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';

class Display extends Page {
  render() {
    return template(this.props.getStore().messenger)
  }
  componentDidMount() {
    super.componentDidMount();
    document.querySelector('#chat_dialog').scrollTo(0,100000)
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