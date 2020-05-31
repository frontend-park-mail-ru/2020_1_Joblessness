import {constructRoutes} from './Container';
import NAVIGATION_ROUTES from '../Navigation/routes'
import LIST_ROUTES from './rroutes'
const Routes = constructRoutes([
  ...NAVIGATION_ROUTES,
  ...LIST_ROUTES,
]);

export default Routes;