import {Settings} from './index';

export const SETTINGS_ELEMENT = new Settings('#responses_display');

const Routes = [
  {
    path: 'display',
    alwaysOn: true,
    element: SETTINGS_ELEMENT
  }
];

export default Routes