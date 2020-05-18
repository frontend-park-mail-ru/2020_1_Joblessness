import {Page} from '../../../Page';
import withLocalStore from '../localStore';
import {equals, requestManager, uuid} from '../../../ulils';
import template from './index.pug'
import {Navigator} from '../../../Navigator';
import {constructRoute} from '../ChatDialog/routes';
import DIALOGS_ROUTES from './routes';
import DIALOG_ROUTES from '../ChatDialog/routes';
import './style.sass'

class Dialogs extends Page {

  render() {
    return template(this.props)
  }

  componentDidMount() {
    super.componentDidMount();
    if(!this.props.dialogs) {
      return
    }
    for(let d of this.props.dialogs) {
      const el = document.querySelector(`#${d.elemId}`);
      el?.addEventListener('click', () => {
        Navigator.removeRoutes(constructRoute(DIALOGS_ROUTES));
        this.props.setStore(s => ({
          messenger: {
            ...s.messenger,
            currentPerson: d
          }
        }));
        Navigator.addRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.updateAllPages();
      })
    }
  }
}

Dialogs = withLocalStore(Dialogs, {
  updateDialogs: (page, oldS, newS) => {
    if(!equals(oldS.messenger.dialogs,newS.messenger.dialogs)) {
      page.props.dialogs = newS.messenger.dialogs.map(d => {d.elemId= uuid();return d;});
    }
    if(oldS.messenger.currentPage !== newS.messenger.currentPage) {
      page.props.needUpdate()
    }
  }
});

export {
  Dialogs
}