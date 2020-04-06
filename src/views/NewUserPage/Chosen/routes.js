import {ChosenPage} from './index';
import { SubRoutes} from './SubRoutes';

const CONTAINER = '#users_current_section';

export const constructRoute = (childRoutes = []) => [
  {
    path: 'users/*',
    childRoutes: [
      {
        path: 'chosen',
        innerPath: 'chosen',
        element: ROOT_ELEMENT,
        childRoutes: [
          {
            ...SubRoutes[0],
            childRoutes,
          }
        ]
      },
    ],
  },
];
export const ROOT_ELEMENT = new ChosenPage(CONTAINER);

const Routes = [
  {
    path: 'favourites',
    element: ROOT_ELEMENT,
    childRoutes: [
      ...SubRoutes,
    ],
  }
];

export default Routes;