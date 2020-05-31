import {Page} from '../../../../Page';
import template from './index.pug'
import ws from '../../../../ws';
import {currentSession} from '../../../../ulils';
import withLocalStore from '../../localStore';
class Input extends Page {
  render() {
    return template({
      ...this.props,
      role : currentSession.user.role
    })
  }
  componentDidMount() {
    super.componentDidMount();
    document.querySelector('#chat_input').focus();
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
    document.querySelector(`#chat_send`)?.addEventListener('click', () => {
      const text = document.querySelector('#chat_input').innerText;
      sendMessage(this, text)
      document.querySelector('#chat_input').innerText = '';
      document.querySelector('#chat_send').classList.add('hidden');
      // setTimeout(
      //   () => document.querySelector('#chat_dialog').scrollTo(0,100000), 100
      // )
    });
    document.querySelector('#chat_input')?.addEventListener('keydown',
      (e) => {
        if(e.key === 'Enter' && !e.metaKey) {
          e.preventDefault();

          const text = document.querySelector('#chat_input').innerText;
          if(!text.trim().length)
            return;
          sendMessage(this, text);
          document.querySelector('#chat_input').innerText = '';
          document.querySelector('#chat_send').classList.add('hidden');
          // setTimeout(
          //   () => document.querySelector('#chat_dialog').scrollTo(0,100000), 100
          // )
        }
      })
  }
}

const sendMessage = (page, m) => {
  ws.sendMessage({
    message: m,
    userOneId: currentSession.user.id,
    userOne: 'name1',
    userTwo: 'name2',
    userTwoId: page.props.getStore().messenger.currentPerson.id
  })

}

Input = withLocalStore(Input);

export const CONTAINER = `#chat_input_holder`;

export const ROOT_ELEMENT = new Input(CONTAINER);

const Routes = [
  {
    path: 'input',
    alwaysOn: true,
    element: ROOT_ELEMENT
  }
]
export default Routes