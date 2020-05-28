import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import {requestManager} from '../../../ulils';
import ws from '../../../ws';
import {Navigator} from '../../../Navigator';
import {PERSON, UNAUTHORISED} from '../../../CONSTANTS';

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
    if (this.#loading || currentSession.user.role === UNAUTHORISED )
      return;
    this.#loading = true;
    loadOnScroll(this);
    loadDialog(this);
    setTimeout(() => {
      this.#loading = false;
    }, 1000);
  }
}

LoadManager = withLocalStore(LoadManager);
export const CONTAINER = `#chat_dialog_lm`;
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
    // const dialog = JSON.parse('{"from":[{"message":"ыва","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T14:01:28.678516Z"},{"message":"21","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:15.267852Z"},{"message":"20","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:11.950178Z"},{"message":"19","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:10.146542Z"},{"message":"18","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:08.756194Z"},{"message":"17","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:07.01601Z"},{"message":"17","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:55.343894Z"},{"message":"16","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:53.652293Z"},{"message":"15","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:52.521889Z"},{"message":"14","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:51.13144Z"},{"message":"13","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:49.463728Z"},{"message":"12","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:48.347978Z"},{"message":"11","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:47.076382Z"},{"message":"10","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:45.970573Z"},{"message":"9","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:44.977743Z"},{"message":"8","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:44.013509Z"},{"message":"7","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:42.170188Z"},{"message":"6","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:41.091517Z"},{"message":"5","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:40.080588Z"},{"message":"4","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:39.122989Z"}],"to":[{"message":"выпа\\n\\n","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:51:35.693514Z"},{"message":"sdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:36.001482Z"},{"message":"hello","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:33.461062Z"},{"message":"hello","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:03.901735Z"},{"message":"pdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T13:06:06.059237Z"},{"message":"pdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T13:01:59.060956Z"},{"message":"два","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T12:39:08.055588Z"},{"message":"Ваше резюме было просмотренно, Вы приглашены на собеседование.","userOneId":35,"userOne":"Cap Cakes","userTwoId":13,"created":"2020-05-26T12:38:05.288629Z"}]}');
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

const sleep = (t) => new Promise(r => setTimeout(r, t));
const loadOnScroll = (page) => {
  const x = document.querySelector('#chat_dialog');
  let lastpage = 0;

  x.addEventListener('scroll', async () => {
    if (x.scrollTop === 0) {
      lastpage++;
      const dialog = await(await requestManager.tryGetDialog(page.props.getStore().messenger.currentPerson.id, lastpage)).json();
      if(!dialog.from.length && !dialog.to.length) {
        lastpage--;
        return;
      }

      // const dialog = JSON.parse('{"from":[{"message":"ыва","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T14:01:28.678516Z"},{"message":"21","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:15.267852Z"},{"message":"20","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:11.950178Z"},{"message":"19","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:10.146542Z"},{"message":"18","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:08.756194Z"},{"message":"17","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:53:07.01601Z"},{"message":"17","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:55.343894Z"},{"message":"16","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:53.652293Z"},{"message":"15","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:52.521889Z"},{"message":"14","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:51.13144Z"},{"message":"13","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:49.463728Z"},{"message":"12","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:48.347978Z"},{"message":"11","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:47.076382Z"},{"message":"10","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:45.970573Z"},{"message":"9","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:44.977743Z"},{"message":"8","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:44.013509Z"},{"message":"7","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:42.170188Z"},{"message":"6","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:41.091517Z"},{"message":"5","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:40.080588Z"},{"message":"4","userOneId":13,"userOne":"name1","userTwoId":35,"userTwo":"name2","created":"2020-05-27T13:52:39.122989Z"}],"to":[{"message":"выпа\\n\\n","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:51:35.693514Z"},{"message":"sdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:36.001482Z"},{"message":"hello","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:33.461062Z"},{"message":"hello","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-27T13:49:03.901735Z"},{"message":"pdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T13:06:06.059237Z"},{"message":"pdf","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T13:01:59.060956Z"},{"message":"два","userOneId":35,"userOne":"name1","userTwoId":13,"userTwo":"name2","created":"2020-05-26T12:39:08.055588Z"},{"message":"Ваше резюме было просмотренно, Вы приглашены на собеседование.","userOneId":35,"userOne":"Cap Cakes","userTwoId":13,"created":"2020-05-26T12:38:05.288629Z"}]}');
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
      const messages = messagesRaw.sort((a, b) => {
        const ad = new Date(a.created).valueOf();
        const bd = new Date(b.created).valueOf();
        if (ad < bd)
          return 1;
        if (ad > bd)
          return -1;
        return 0;
      });

      const oldS = x.scrollHeight;
      page.props.setStore(s => ({
        messenger: {
          ...s.messenger,
          messages: [
            ...s.messenger.messages, ...messages
          ],
        }
      }));
      const newX = document.querySelector('#chat_dialog');
      newX.scrollBy(0, newX.scrollHeight - oldS)

    }
  })
};