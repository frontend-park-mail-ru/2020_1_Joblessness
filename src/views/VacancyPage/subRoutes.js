import {OrganizationInfoNoStore} from '../OrganizationPage/OrganizationInfo';
import ResponsibilitiesRoutes from './responsibilities/routes';
import ConditionsRoutes from './conditions/routes';
import withLocalStore from './localStore';
import {Main} from './mainInfo';
import NAVIGATION_ROUTES from '../Navigation/routes'
const RootPath = 'vacancies/';
const OrganizationInfo = withLocalStore(OrganizationInfoNoStore);
const SubRoutes = [

  {
    path: 'vacInfo',
    alwaysOn: true,
    element: new OrganizationInfo('#vacancy_org_info'),
  },
  {
    path: 'mainInfo',
    alwaysOn: true,
    element: new Main('#vacancy_main_info'),
  },
  ...NAVIGATION_ROUTES,
  ...ResponsibilitiesRoutes,
  ...ConditionsRoutes,
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
