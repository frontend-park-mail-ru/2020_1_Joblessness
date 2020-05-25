import {UserInfo} from './UserInfo';
import SETTINGS_ROUTES from './Settings/routes';
import SUMMARIES_ROUTES from './Summaries/routes';
import CHOSEN_ROUTES from './Chosen/routes';
import RECOMMENDATION_ROUTES from './Recommendations/routes';
import {NavPage} from './nav';
import {ChosenButtonRoutes} from '../ChosenButton';
import NAVIGATION_ROUTES from '../Navigation/routes'
const RootPath = 'users/';

export const CONTAINER = '#users_current_section';

export const constructSubRoutes = (childRoutes = []) => [
  {
    path: RootPath + '*',
    childRoutes,
  },
];

const ChainedRoutes = [
  {
    path: 'userInfo',
    alwaysOn: true,
    element: new UserInfo('#users_info'),
  },
  {
    path: 'nav',
    alwaysOn: true,
    element: new NavPage('#users_nav'),
  },
  ...ChosenButtonRoutes,
  ...SETTINGS_ROUTES,
];

const SubRoutes = [
  ...NAVIGATION_ROUTES,
  {
    path: 'userInfo',
    alwaysOn: true,
    element: new UserInfo('#users_info'),
  },
  {
    path: 'nav',
    alwaysOn: true,
    element: new NavPage('#users_nav'),
  },
  ...ChosenButtonRoutes,
  ...SETTINGS_ROUTES,
  ...RECOMMENDATION_ROUTES,
  ...CHOSEN_ROUTES,
  ...SUMMARIES_ROUTES,
];


export {
  SubRoutes,
  ChainedRoutes,
  RootPath,
};
