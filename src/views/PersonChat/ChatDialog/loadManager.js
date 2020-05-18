import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import {requestManager} from '../../../ulils';
import ws from '../../../ws';
import {Navigator} from '../../../Navigator';
import {PERSON} from '../../../CONSTANTS';

class LoadManager extends Page {
  #loading;
  constructor(props) {
    super(props);
    ws.subscribe({
      onMessage: (m) => loadMessage(this, m)
    })
  }

  render() {
    return ''
  }

  componentDidMount() {
    super.componentDidMount();
    if(this.#loading || currentSession.user.role !== PERSON)
      return;
    this.#loading = true;
    loadDialog(this);
    setTimeout(() => {this.#loading = false;},1000);
  }
}

LoadManager = withLocalStore(LoadManager);
export const CONTAINER = `#chat_display_load_manager`;
export const LOAD_MANAGER_ELEMENT = new LoadManager(CONTAINER);
const Routes = [
  {
    path: 'displayLoadManager',
    element: LOAD_MANAGER_ELEMENT,
    alwaysOn: true
  }
];

export default Routes

export {
  LoadManager
}

const loadDialog = async (page) => {
  try {
    const dialog = await (await requestManager.tryGetDialog(page.props.getStore().messenger.currentPerson.id)).json();
    const messagesRaw = [
      ...dialog.from.map(d => {
        d.toYou = false;
        return d;
      }),
      ...dialog.to.map(d => {
        d.toYou = true;
        return d;
      }),
    ];
    window.messages = [...messagesRaw];
    const messages = messagesRaw.sort((a, b) => {
      const ad = new Date(a.created).valueOf();
      const bd = new Date(b.created).valueOf();
      if (ad < bd)
        return 1;
      if (ad > bd)
        return -1;
      return 0;
    });
    page.props.setStore(s => ({
      messenger: {
        ...s.messenger,
        messages,
      }
    }));
    Navigator.updateAllPages();
  } catch (e) {
    console.log(e)
  }
};

const loadMessage = async (page, message) => {
  if (message.userOneId === currentSession.user.id) {
    message.toYou = false;
  } else {
    message.toYou = true;
  }
  page.props.setStore(s => {
    return {
      messenger: {
        ...s.messenger,
        messages: [message, ...s.messenger.messages]
      }
    }
  });
  Navigator.updateAllPages();
};
