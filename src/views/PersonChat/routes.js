import {PersonChat} from './index';
import DIALOG_ROUTES from './ChatDialog/routes'
import DIALOGS_ROUTES from './ChatDialogs/routes'
export const CONTAINER = '#user-chat';
export const ROOT_ELEMENT = new PersonChat(CONTAINER);

const Routes = [
  {
    path: 'userChat',
    element: ROOT_ELEMENT,
    alwaysOn: true,
    childRoutes: [
      // ...DIALOGS_ROUTES,
    ]
  }
];

export default Routes