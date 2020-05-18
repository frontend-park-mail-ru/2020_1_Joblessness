import {Dialog} from './index';
import LOAD_MANAGER_ROUTES from './loadManager'
import {ROOT_ELEMENT} from '../routes';
export const CONTAINER = '#chat_display';
export const DISPLAY_ELEMENT = new Dialog(CONTAINER);

export const constructRoute = (childRoutes = []) => [
  {
    path: 'userChat',
    childRoutes
  }
];
const Routes = [
  ...LOAD_MANAGER_ROUTES,
  {
    path : 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  },
];

export default Routes