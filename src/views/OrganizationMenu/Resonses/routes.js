import {Display} from './Display';
import {LoadManager} from './LoadManager';
import SELECT_DATE_ROUTES from './SelectDate'
export const DISPLAY_ELEMENT = new Display('#responses_display');
export const LOAD_MANAGER_ELEMENT = new LoadManager('#responses_load_manager');

const Routes = [
  {
    path: 'loadManager',
    alwaysOn: true,
    element: LOAD_MANAGER_ELEMENT,
  },
  {
    path: 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  },
  ...SELECT_DATE_ROUTES,
];

export default Routes;