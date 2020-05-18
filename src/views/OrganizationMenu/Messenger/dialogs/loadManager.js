import {Page} from '../../../../Page';
import withLocalStore from '../../localStore';
import {requestManager, uuid} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';

class LoadManager extends Page {
  render() {
    return ''
  }

  componentDidMount() {
    super.componentDidMount();
    loadDialogs(this);
  }
}

LoadManager = withLocalStore(LoadManager);

export {
  LoadManager
}

const sleep = (t) =>new Promise(resolve => {setTimeout(resolve, t)})
const loadDialogs = async (page) => {
  try {
    const dialogs =
    //   [
    //   {
    //     chatter_name: "Михаил Балицкий",
    //     chatter_id: 2,
    //     interview_date: 'сегодня'
    //   },
    //   {
    //     chatter_name: "Александр Пушкин",
    //     chatter_id: 3,
    //     interview_date: 'сегодня'
    //   },
    // ]
    await (await requestManager.tryGetDialogs()).json();
    page.props.setStore(s => (
      {
        messenger: {
          ...s.messenger,
          dialogs: dialogs.map(d => ({
            user : d['chatter_name'],
            id: d['chatter_id'],
            tag: d.tag,
            avatar: d.avatar,
            interviewDate: d['interview_date'], elemId: uuid()
          }))
        }
      }
    ))
    Navigator.updateAllPages();
  } catch (e) {
    alert('Невозможно получить список диалогов')
    console.log(e)
  }
}