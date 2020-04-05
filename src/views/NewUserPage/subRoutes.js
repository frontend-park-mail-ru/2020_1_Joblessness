import {UserInfo} from './UserInfo';
import SETTINGS_ROUTES from './Settings/routes'
import {SummariesSubPage} from './Summaries';
import {FavouriteSubPage} from './favourite';
import {StatisticsSubPage} from './statistics';
import {NavPage} from './nav';

const RootPath = 'users/';

const CONTAINER = '#users_current_section';

const UserSubRoutes = [
  ...SETTINGS_ROUTES,
  {
    path: 'summaries',
    next: '/summaries',
    element: new SummariesSubPage(CONTAINER),
  },
  {
    path: '/favourite',
    next: '/favourite',
    element: new FavouriteSubPage(CONTAINER),
  },
  {
    path: '/',
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
    element: new NavPage('#users_nav')
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
