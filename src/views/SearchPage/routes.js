import {SearchPage} from './index';
import SubRoutes from './subRoutes';
const Routes = [
  {
    path: '^$|^/{1}$|index|index/',
    element: new SearchPage('#root'),
    childRoutes: [
      ...SubRoutes,
    ],
  },
];

export default Routes;
