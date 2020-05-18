import {Dialogs} from './index';
import {LoadManager} from './loadManager';

export const CONTAINER = '#chat_display';
export const DISPLAY_ELEMENT = new Dialogs(CONTAINER);
export const LOAD_DIALOGS_ELEMENT = new LoadManager(`${CONTAINER}_load_manager`);
const Routes = [
  {
    path : 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  },
  {
    path: 'loadManager',
    element: LOAD_DIALOGS_ELEMENT,
    alwaysOn: true,
  }
];

export default Routes