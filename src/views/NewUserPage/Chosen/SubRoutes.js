import {ChosenListPage} from './ChosenList';
import LoadManagerRoutes from './loadManager';

const CHOSEN_LIST = new ChosenListPage('#chosen_list');


const SubRoutes = [
  {
    path: 'preview',
    innerPath: 'preview',
    element: CHOSEN_LIST,
    alwaysOn: true,
  },
  ...LoadManagerRoutes,
];
export {
  SubRoutes,
}