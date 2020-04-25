import {ResponsesPage} from './index';
import {Routes, AddItemRoutes, ROOT, ROOT_ELEMENT as CONTAINER_ELEMENT} from './Container/routes';

const ROOT_PATH = '/responses';

const CONTAINER = '#responses-page';

export const ROOT_ELEMENT = new ResponsesPage(CONTAINER);


export const constructRoute = (childRoutes = []) => [
  {
    path: ROOT_PATH,
    element: ROOT_ELEMENT,
    alwaysOn: true,
    childRoutes: [
      {
        path: ROOT,
        alwaysOn: true,
        element: CONTAINER_ELEMENT,
        childRoutes,
      },
    ],
  },
];


export default constructRoute([
  {
    path: ROOT,
    alwaysOn: true,
    element: CONTAINER_ELEMENT,
    childRoutes: Routes,
  },
]);
