import {Page} from '../../../../Page';
import withLocalStore from '../../localStore';
import {requestManager} from '../../../../ulils';

class LoadManager extends Page {
  render() {
    return ''
  }

  componentWillMount() {
    super.componentWillMount();
    loadDialogs(this);
  }
}

LoadManager = withLocalStore(LoadManager);

export {
  LoadManager
}


const loadDialogs = async (page) => {
  try {
    const dialogs = await (await requestManager.tryGetDialogs()).json();
    page.props.setStore(s => (
      {
        messenger: {
          ...s.messenger,
          dialogs
        }
      }
    ))
  } catch (e) {
    alert('Невозможно получить список диалогов')
    console.log(e)
  }
}