import {SummaryPage} from './index';
import INFO_ROUTES from './Info/routes';
import MAIN_INFO_ROUTES from './Main/routes';
import EXPERIENCE_ROUTES from './Experience/routes';
import EDUCATION_ROUTES from './Education/routes';
import {Print} from './Print';
export const ROUTES = [
  {
    path: 'summaries/*',
    element: new SummaryPage('#root'),
    childRoutes: [
      ...INFO_ROUTES,
      ...MAIN_INFO_ROUTES,
      ...EXPERIENCE_ROUTES,
      ...EDUCATION_ROUTES,
      {
        path: 'print',
        alwaysOn: true,
        element: new Print('#print_summary')
      }
    ],
  },
];

export default ROUTES;
