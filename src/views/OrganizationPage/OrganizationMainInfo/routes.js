import {OrganizationMainInfoPage} from './index';
import {RootPath, constructSubRoutes, SubRoutes } from './subRoutes'
const Routes = [
  {
    path: RootPath,
    alwaysOn: true,
    element: new OrganizationMainInfoPage('#organization_org_main_info'),
    childRoutes: SubRoutes,
  },
];

export {
  Routes,
  RootPath,
  constructSubRoutes,
  SubRoutes,
}

export default Routes