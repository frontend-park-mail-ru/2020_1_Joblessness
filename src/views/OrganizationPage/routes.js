import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {OrganizationPage} from './index';

const Routes = [
  {
    path: RootPath + '*',
    element: new OrganizationPage('#root'),
    childRoutes: SubRoutes,
  },
];

export {
  SubRoutes,
  RootPath,
  Routes,
  constructSubRoutes,
};

export default Routes;
