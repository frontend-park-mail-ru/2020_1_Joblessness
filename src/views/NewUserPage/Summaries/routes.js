import {SummariesPage} from './index';
import { SubRoutes} from './SubRoutes';

const CONTAINER = '#users_current_section';

export const constructRoute = (childRoutes = []) => [
  {
    path: 'users/*',
    childRoutes: [
      {
        path: '/*summaries',
        innerPath: 'summaries',
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
export const ROOT_ELEMENT = new SummariesPage(CONTAINER);

const Routes = [
  {
    path: '/*summaries',
    element: ROOT_ELEMENT,
    childRoutes: [
      ...SubRoutes,
    ],
  }
];

export default Routes;