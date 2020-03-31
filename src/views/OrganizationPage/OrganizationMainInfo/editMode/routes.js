import {EditInfo} from './index';
import {RootPath, FullRoot, constructSubRoutes, SubRoutes } from './subRoutes'
const Routes = [
  {
    path: RootPath,
    innerPath: 'editMode/',
    alwaysOn: true,
    element: new EditInfo('#organization_main_info_current_mode'),
  },
  ...SubRoutes,
];

export {
  Routes,
  RootPath,
  FullRoot,
  constructSubRoutes,
  SubRoutes,
}

export default Routes