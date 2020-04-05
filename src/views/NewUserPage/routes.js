import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {UserPage} from './index';

const Routes = [
  {
    path: RootPath + '*',
    element: new UserPage('#root'),
    childRoutes: [
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
