import {Dialogs} from './index';

export const CONTAINER = '#messenger_display';
export const DISPLAY_ELEMENT = new Dialogs(CONTAINER);

const Routes = [
  {
    path : 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  }
];

export default Routes