import {Dialog} from './index';

export const CONTAINER = '#messenger_display';
export const DISPLAY_ELEMENT = new Dialog(CONTAINER);

const Routes = [
  {
    path : 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
  }
];

export default Routes