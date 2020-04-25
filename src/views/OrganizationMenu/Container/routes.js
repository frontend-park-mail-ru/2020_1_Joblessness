import {ContainerPage} from './index';
import Navigation from '../Navigation';

const CONTAINER = '#responses_container';

export const ROOT = 'container';

export const ROOT_ELEMENT = new ContainerPage(CONTAINER);
const Routes = [
  {
    path : 'navigation',
    alwaysOn: true,
    element: new Navigation('#responses_nav')
  }
];

const AddItemRoutes = (childRoutes = []) => [
  {
    path: 'display',
    childRoutes,
  },
];

export default Routes;

export {
  Routes,
  AddItemRoutes,
};
