import {Messenger} from './index';
import DIALOGS_ROUTES from './dialogs/routes'
export const MESSENGER_ELEMENT = new Messenger('#responses_display');
import {constructRoute as constructParentRoute} from '../routes';

const Routes = [
  {
    path: 'display',
    alwaysOn: true,
    element: MESSENGER_ELEMENT,
    childRoutes: [
      ...DIALOGS_ROUTES,
    ]
  }
];

export const constructRoute  = (childRoutes) => constructParentRoute([
  {
    path: 'display',
    alwaysOn: true,
    element: MESSENGER_ELEMENT,
    childRoutes
  }
]);

export default Routes