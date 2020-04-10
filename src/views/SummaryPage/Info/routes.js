import {UserInfoNoStore} from '../../NewUserPage/UserInfo';
import {withLocalStore} from '../localStore';

const UserInfo = withLocalStore(UserInfoNoStore);
export const CONTAINER = '#summary_info';

export const ROOT_ELEMENT = new UserInfo(CONTAINER);

export const ROUTES = [
  {
    path: 'info',
    alwaysOn: true,
    element: ROOT_ELEMENT,
  },
];

export default ROUTES;
