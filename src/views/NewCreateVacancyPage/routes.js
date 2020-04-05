import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {CreateVacancyPage} from './index';
import RESPONSE_ROUTES from './responsePage/routes';

const Routes = [
  ...RESPONSE_ROUTES,
  {
    path: RootPath + '*',
    element: new CreateVacancyPage('#root'),
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
