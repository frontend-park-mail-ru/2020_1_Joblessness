import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import {equals, requestManager, uuid} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {PERSON, UNAUTHORISED} from '../../../CONSTANTS';

class LoadManager extends Page {
  #loading;
  render() {
    return ''
  }
  componentWillUpdate() {
    super.componentWillUpdate();
  }

  componentDidMount() {
    super.componentDidMount();
    if(this.#loading || currentSession.user.role === UNAUTHORISED )
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
    // const dialogs = JSON.parse(`[{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"},{"chatter_id":35,"avatar":"https://hb.bizmrg.com/imgs-hh/35-avatar.jpg","chatter_name":"Cap Cakes","tag":"CapCakes","interview_date":"0001-01-01T00:00:00Z"}]`);
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