import {ResponsePage} from './index';
import SubRoutes from './summaries/routes'

const Routes = [
  {
    path: 'response',
    element: new ResponsePage('#vacancy_responce'),
    childRoutes: [
      ...SubRoutes
    ]
  },
];

export default Routes