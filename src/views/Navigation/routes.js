import {NavigationBar} from './index';


export const CONTAINER = '#nav_bar';
export const CONTAINER_ELEMENT= new NavigationBar(CONTAINER);

const Routes = [
  {
    path: 'nav',
    alwaysOn: true,
    element: CONTAINER_ELEMENT
  }
];

export default Routes