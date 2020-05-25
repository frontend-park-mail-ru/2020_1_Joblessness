import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {OrganizationPage} from './index';
import NAVIGATION_ROUTES from '../Navigation/routes'
const Routes = [
  {
    path: RootPath + '*',
    element: new OrganizationPage('#root'),
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...SubRoutes,
    ]
  },
];

export {
  SubRoutes,
  RootPath,
  Routes,
  constructSubRoutes,
};

export default Routes;
