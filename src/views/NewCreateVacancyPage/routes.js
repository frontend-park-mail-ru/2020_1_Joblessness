import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {CreateVacancyPage} from './index';

const Routes = [
  {
    path: RootPath + '*',
    element: new CreateVacancyPage('#root'),
    childRoutes: SubRoutes,
  }
];

export {
  SubRoutes,
  RootPath,
  Routes,
  constructSubRoutes,
};

export default Routes