import {ContainerPage} from './index';
import {Display} from '../Display';
import {LoadManager} from '../LoadManager';

const CONTAINER = '#responses_container';

export const ROOT = 'container';

export const ROOT_ELEMENT = new ContainerPage(CONTAINER);
export const DISPLAY_ELEMENT = new Display('#responses_display');
export const LOAD_MANAGER_ELEMENT = new LoadManager('#responses_load_manager')

const Routes = [
  {
    path: 'loadManager',
    alwaysOn: true,
    element: LOAD_MANAGER_ELEMENT,
  },
  {
    path: 'display',
    element: DISPLAY_ELEMENT,
    alwaysOn: true,
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
}