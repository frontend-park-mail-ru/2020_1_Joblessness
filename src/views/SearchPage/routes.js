import {SearchPage} from './index';
import SubRoutes from './subRoutes';
import NAVIGATION_ROUTES from '../Navigation/routes'

const CONTAINER = '#root';
const CONTAINER_ELEMENT = new SearchPage(CONTAINER);
const Routes = [
  {
    path: '^$|^/$|search',
    element: CONTAINER_ELEMENT,
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...SubRoutes,
    ],
  },
  {
    path: 'search/vacancies',
    element: CONTAINER_ELEMENT,
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...SubRoutes,
    ],
  },
  {
    path: 'search/users',
    element: CONTAINER_ELEMENT,
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...SubRoutes,
    ],
  },
  {
    path: 'search/organizations',
    element: CONTAINER_ELEMENT,
    childRoutes: [
      ...NAVIGATION_ROUTES,
      ...SubRoutes,
    ],
  },
];

export default Routes;
