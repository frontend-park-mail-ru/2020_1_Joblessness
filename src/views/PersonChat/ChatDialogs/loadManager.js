import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import {equals, requestManager, uuid} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {PERSON} from '../../../CONSTANTS';

class LoadManager extends Page {
  #loading
  render() {
    return ''
  }

  componentDidMount() {
    super.componentDidMount();
    if(this.#loading || currentSession.user.role !== PERSON)
      return;
    this.#loading = true;
    loadDialogs(this);
    setTimeout(() => {this.#loading = false;},1000);
  }
}

LoadManager = withLocalStore(LoadManager);

export {
  LoadManager
}

const sleep = (t) =>new Promise(resolve => {setTimeout(resolve, t)})
const loadDialogs = async (page) => {
  try {
    const dialogs = await (await requestManager.tryGetDialogs()).json();
    const mappedDialogs = dialogs.map(d => ({
      user : d['chatter_name'],
      id: d['chatter_id'],
      tag: d.tag,
      avatar: d.avatar,
      interviewDate: d['interview_date'],
    }));
    if(equals(mappedDialogs.length, page.props.getStore().messenger.dialogs.length)) {
      return;
    }
    page.props.setStore(s => (
      {
        messenger: {
          ...s.messenger,
          dialogs: mappedDialogs
        }
      }
    ))
    Navigator.updateAllPages();
  } catch (e) {
    alert('Невозможно получить список диалогов')
    console.log(e)
  }
}