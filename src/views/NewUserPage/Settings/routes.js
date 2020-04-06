import {SubRoutes, ROOT_ELEMENT} from './SubRoutes';

const Routes = [
  {
    path: '/*settings',
    element: ROOT_ELEMENT,
    childRoutes: [
      ...SubRoutes,
    ],
  },
];

export default Routes;
