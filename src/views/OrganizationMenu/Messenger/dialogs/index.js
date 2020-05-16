import {Page} from '../../../../Page';
import withLocalStore from '../../localStore';
import {uuid} from '../../../../ulils';
import template from './index.pug'
import {Navigator} from '../../../../Navigator';
import {constructRoute} from '../routes';
import DIALOGS_ROUTES from './routes';
import DIALOG_ROUTES from '../dialog/routes';
import './style.sass'

class Dialogs extends Page {

  constructor(props) {
    super(props);
    this.props.dialogs = [
        {
          user: 'mikstime',
          id: 1,
          elemId: uuid()
        },
        {
          user: 'emitskim',
          id: 2,
          elemId: uuid()
        }
      ]
  }

  render() {
    return template(this.props)
  }

  componentDidMount() {
    super.componentDidMount();

    for(let d of this.props.dialogs) {
      const el = document.querySelector(`#${d.elemId}`);
      el.addEventListener('click', () => {
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
    if(oldS.messenger.currentPage !== newS.messenger.currentPage &&
      newS.messenger.currentPage === 'dialogs') {
      page.props.needUpdate()
    }
  }
});
export {
  Dialogs
}