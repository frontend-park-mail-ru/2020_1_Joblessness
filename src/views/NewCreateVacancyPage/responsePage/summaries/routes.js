import {SummariesList} from './index';
import {CreateSummaryButton} from './CreateSummaryButton';


const ROOT_ELEMENT = new SummariesList('#response_summaries');
export const DEF_ROUTES = [{
  path: 'any',
  alwaysOn: true,
  element: new CreateSummaryButton('#create-vacancy-holder'),
}];
const ROUTES = [
  {
    path: 'summaries',
    innerPath: 'summaries',
    alwaysOn: true,
    element: ROOT_ELEMENT,
    childRoutes: [
      ...DEF_ROUTES,
    ],
  },
];
export const constructRoute = (childRoutes = []) => [
  {
    path: 'vacancies\/(\\d+)\/response',
    childRoutes: [
      {
        path: 'summaries',
        innerPath: 'summaries',
        alwaysOn: true,
        element: ROOT_ELEMENT,
        childRoutes,
      },
    ],
  },
];
export default ROUTES;
