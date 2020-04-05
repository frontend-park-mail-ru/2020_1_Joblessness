import {ResponsePage} from './index';
import SubRoutes from './summaries/routes'
import LoadManagerRoutes from './summaries/loadManager';

const Routes = [
  {
    path: 'vacancies\/(\\d+)\/response',
    element: new ResponsePage('#root'),
    childRoutes: [
      ...SubRoutes,
      ...LoadManagerRoutes,
    ]
  },
];

export default Routes