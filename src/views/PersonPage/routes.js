import {SubRoutes, constructSubRoutes, RootPath} from './subRoutes';
import {UserPage} from './index';


export const CONTAINER = '#root';
export const PERSON_PAGE_ELEMENT = new UserPage(CONTAINER);

export const createRoute = (childRoutes = []) => [
  {
    path: RootPath + '*',
    element: PERSON_PAGE_ELEMENT,
    childRoutes,
  },
];

const Routes = createRoute(SubRoutes);
export {
  SubRoutes,
  RootPath,
  Routes,
  constructSubRoutes,
};

export default Routes;
