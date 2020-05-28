import {Page} from '../../../Page';
import template from './index.pug'
import './style.sass';
import withLocalStore from '../localStore';
import {Navigator} from '../../../Navigator';
import DIALOG_ROUTES, {constructRoute} from './routes';
import DIALOGS_ROUTES from '../ChatDialogs/routes';
import {PERSON} from '../../../CONSTANTS';


class Dialog extends Page {
  render() {
    return template({
      // inverted value
      isOrg : currentSession.user.role === PERSON,
      ...(this.props.getStore().messenger)
    })
  }

  componentDidMount() {
    super.componentDidMount();
    document.querySelector('#chat_back').addEventListener('click',
      (e) => {
        e.stopPropagation()
        Navigator.removeRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.addRoutes(constructRoute(DIALOGS_ROUTES));
        Navigator.updateAllPages();
        Navigator.removeRoutes(constructRoute(DIALOG_ROUTES));
        Navigator.addRoutes(constructRoute(DIALOGS_ROUTES));
        Navigator.updateAllPages();
      }
    );
  }

}

Dialog = withLocalStore(Dialog);

export const CONTAINER = '#chat_display';
export const DISPLAY_ELEMENT = new Dialog(CONTAINER);

const Routes = [
  {
    path: 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  }
];

export default Routes;