import LOAD_MANAGER_ROUTES from './loadManager'
import INPUT_ROUTES from './Input'
import DISPLAY_ROUTES from './Display'
import DIALOG_ROUTES from './index'
export const constructRoute = (childRoutes = []) => [
  {
    path: 'userChat',
    childRoutes
  }
];
const Routes = [
  ...DIALOG_ROUTES,
  ...LOAD_MANAGER_ROUTES,
  ...DISPLAY_ROUTES,
  ...INPUT_ROUTES,
];
export default Routes