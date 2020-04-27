import {Page} from '../../../../Page';
import withLocalStore from '../../localStore';
import {uuid} from '../../../../ulils';
import template from './index.pug'
import {Navigator} from '../../../../Navigator';
import {constructRoute} from '../routes';
import DIALOGS_ROUTES from '../dialogs/routes';
import DIALOG_ROUTES from './routes';
import './style.sass';

class Dialog extends Page {
  render() {
    return template(this.props.getStore().messenger)
  }

  componentDidMount() {
    super.componentDidMount();

    document.querySelector('#dialog_back').addEventListener('click',
      () => {
        Navigator.removeRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.addRoutes(constructRoute(DIALOGS_ROUTES));
        Navigator.updateAllPages();
      }
    );
    document.querySelector('#dialog_input').addEventListener('input',
      (e) => {
        const text = e.target.innerText
        const button  = document.querySelector('#dialog_send');
        if(text === '\n')
          e.target.innerText = '';
        if(text.trim().length) {
          button.classList.remove('hidden')
        } else {
          button.classList.add('hidden')
        }
      }
    )
  }
}

Dialog = withLocalStore(Dialog, {
  updateDialog: (page, oldS, newS) => {
    if (oldS.messenger.currentPage !== newS.messenger.currentPage &&
      newS.messenger.currentPage === 'dialog') {
      page.props.random = uuid();
    }
  }
});
export {
  Dialog
}