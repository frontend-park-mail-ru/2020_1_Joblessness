import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import template from './index.pug'
import {Navigator} from '../../../Navigator';
import {constructRoute} from './routes';
import DIALOGS_ROUTES from '../ChatDialogs/routes';
import DIALOG_ROUTES from './routes';
import './style.sass';
import ws from '../../../ws';
import {currentSession, equals} from '../../../ulils';

class Dialog extends Page {
  render() {
    return template(this.props.getStore().messenger)
  }

  componentDidMount() {
    super.componentDidMount();
    document.querySelector('#chat_back').addEventListener('click',
      (e) => {
      e.stopPropagation()
        Navigator.removeRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.addRoutes(constructRoute(DIALOGS_ROUTES));
        Navigator.updateAllPages();
        Navigator.removeRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.addRoutes(constructRoute(DIALOGS_ROUTES));
        Navigator.updateAllPages();
      }
    );
    document.querySelector('#chat_input').addEventListener('input',
      (e) => {
        const text = e.target.innerText
        const button  = document.querySelector('#chat_send');
        if(text === '\n')
          e.target.innerText = '';
        if(text.trim().length) {
          button.classList.remove('hidden')
        } else {
          button.classList.add('hidden')
        }
      }
    )
    document.querySelector(`#chat_send`).addEventListener('click', () => {
      const text = document.querySelector('#chat_input').innerText;
      sendMessage(this, text)
    })
    document.querySelector('#chat_input').addEventListener('keydown',
      (e) => {
      const text = document.querySelector('#chat_input').innerText;
      if(e.key === 'Enter' && e.metaKey)
        sendMessage(this, text)
      })
  }
}
const sendMessage = (page, m) => {
  console.log(page.props.getStore(), m)
  ws.sendMessage({
    message: m,
    userOneId: currentSession.user.id,
    userOne: 'name1',
    userTwo: 'name2',
    userTwoId: page.props.getStore().messenger.currentPerson.id
  })
}
Dialog = withLocalStore(Dialog, {
  updateDialog: (page, oldS, newS) => {
    if (!equals(oldS.messenger.messages, newS.messenger.messages)) {
      page.needUpdate();
    }
  }
});
export {
  Dialog
}