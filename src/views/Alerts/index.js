import {Page} from '../../Page';
import template from './index.pug'
import {Navigator} from '../../Navigator';
import {uuid} from '../../ulils';
import {withLocalStore} from './localStore';
import Alert from './Alert';
import './style.sass'
class Alerts extends Page {

  render() {
    return template(this.props.getStore())
  }
}

Alerts = withLocalStore(Alerts, {
  alertAdded: (page, oldState, newState) => {
    if(oldState.alerts.length !== newState.alerts.length)
      page.needUpdate();
      Navigator.updateAllPages();
  }
});
export const CONTAINER = '#alerts_container';
export const ALERTS_ELEMENT = new Alerts(CONTAINER);

const constructRoute = (childRoutes = []) => [
  {
    path: 'alert',
    alwaysOn: true,
    element: ALERTS_ELEMENT,
    childRoutes
  }
];

const Routes = constructRoute();

alert = (msg, type = 'error') => {
  const newId = uuid();
  const alertElement = new Alert(`#${newId}`);
  alertElement.props.alert = {
    text: msg,
    type,
  };
  const newAlertRoute = {
    path: newId,
    alwaysOn: true,
    element: alertElement
  };
  const alertItem = {
    id: newId,
    type
  };
  ALERTS_ELEMENT.props.setStore(s => ({
    alerts: [
      ...s.alerts,
      alertItem,
    ]
  }));

  alertElement.props.hide = () => {
    Navigator.removeRoutes(constructRoute([newAlertRoute]));
    ALERTS_ELEMENT.props.setStore(s => ({
      alerts: s.alerts.filter(a => a.id !== newId)
    }));
    alertElement.getContainer()?.classList.add('removing-');
    setTimeout(() => {
      alertElement.getContainer()?.remove();
    }, 40000)
  };
  Navigator.addRoutes(constructRoute([newAlertRoute]));
  Navigator.updateAllPages();
}
export default Routes