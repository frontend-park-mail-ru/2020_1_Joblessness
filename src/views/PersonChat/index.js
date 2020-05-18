import {Page} from '../../Page';
import template from './index.pug'
import './style.sass'
import {withAuthManager} from '../../ulils/AuthManager';
import {PERSON} from '../../CONSTANTS';
import {Navigator} from '../../Navigator';
import DIALOGS_ROUTES from './ChatDialogs/routes';
import DIALOG_ROUTES from './ChatDialog/routes';
import {ROOT_ELEMENT} from './routes';

class PersonChat extends Page {
  #shown
  render() {
    return template(this.props)
  }

  componentDidMount() {
    super.componentDidMount();
    const el =document.querySelector('#user-chat')
    if(currentSession.user.role !== PERSON) {
      el.classList.add('hidden')
    } else {
      el.classList.remove('hidden')
    }
    this.getContainer().addEventListener('click', (e) => {
      e.stopPropagation()
      if(!this.#shown) {
        this.getContainer().classList.add('visible');
        setTimeout(() => this.#shown = true, 100)
        Navigator.addRoutes([
          {
            path: 'userChat',
            element: ROOT_ELEMENT,
            alwaysOn: true,
            childRoutes: [
              ...DIALOGS_ROUTES,
            ]
          }
        ])
        Navigator.updateAllPages()
      }
    })
    document.querySelector(`#chat_hide`).addEventListener('click', (e) => {
      if(this.#shown) {
        this.getContainer().classList.remove('visible')
        setTimeout(() => this.#shown = false, 100)
        Navigator.removeRoutes([
          {
            path: 'userChat',
            element: ROOT_ELEMENT,
            alwaysOn: true,
            childRoutes: [
              ...DIALOGS_ROUTES,
              ...DIALOG_ROUTES,
            ]
          }
        ])
        Navigator.updateAllPages()
      }
    })
  }
}

PersonChat = withAuthManager(PersonChat);

export {
  PersonChat
}