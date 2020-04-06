import {UserInfo} from './UserInfo';
import SETTINGS_ROUTES from './Settings/routes';
import SUMMARIES_ROUTES from './Summaries/routes';
import CHOSEN_ROUTES from './Chosen/routes'
import {StatisticsSubPage} from './statistics';
import {NavPage} from './nav';

const RootPath = 'users/';

const CONTAINER = '#users_current_section';

const UserSubRoutes = [
  ...SETTINGS_ROUTES,
  ...SUMMARIES_ROUTES,
  ...CHOSEN_ROUTES,
  {
    path: '^$|^/{1}$',
    next: '/',
    element: new StatisticsSubPage(CONTAINER),
  },
];

const SubRoutes = [
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
  ...UserSubRoutes,
  // ...MainInfoRoutes,
  // ...LoadManagerRoutes,
];

const constructSubRoutes = (subRoutes) => [
  {
    path: RootPath + '*',
    childRoutes: [
      ...subRoutes,
    ],
  },
];


export {
  SubRoutes,
  RootPath,
  constructSubRoutes,
};
