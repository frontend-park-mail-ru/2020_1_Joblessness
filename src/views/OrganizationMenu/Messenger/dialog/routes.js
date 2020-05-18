import {Dialog} from './index';
import LOAD_MANAGER_ROUTES from './loadManager'
export const CONTAINER = '#messenger_display';
export const DISPLAY_ELEMENT = new Dialog(CONTAINER);

const Routes = [
  ...LOAD_MANAGER_ROUTES,
  {
    path : 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  },
];

export default Routes