import {SummariesListPage} from './SummariesList';
import LoadManagerRoutes from './loadManager';

const SUMMARIES_LIST = new SummariesListPage('#summaries_list');


const SubRoutes = [
  {
    path: 'preview',
    innerPath: 'preview',
    element: SUMMARIES_LIST,
    alwaysOn: true,
  },
  ...LoadManagerRoutes,
];
export {
  SubRoutes,
}