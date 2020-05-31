import {ResponsePage} from './index';
import SubRoutes from './summaries/routes';
import LoadManagerRoutes from './summaries/loadManager';
import NAVIGATION_ROUTES from '../../Navigation/routes';
const Routes = [
  ...NAVIGATION_ROUTES,
  {
    path: 'vacancies\/(\\d+)\/response',
    element: new ResponsePage('#root'),
    childRoutes: [
      ...SubRoutes,
      ...LoadManagerRoutes,
    ],
  },
];

export default Routes;
