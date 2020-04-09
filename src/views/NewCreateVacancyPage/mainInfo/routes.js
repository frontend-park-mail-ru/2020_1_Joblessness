import {Main} from './index';


export const CONTAINER = '#summary_main_info';

export const ROOT_ELEMENT = new Main(CONTAINER);

export const ROUTES = [
  {
    path: 'mainInfo',
    alwaysOn: true,
    element: ROOT_ELEMENT,
  },
];

export default ROUTES;
