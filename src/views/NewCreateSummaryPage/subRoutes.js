import {OrganizationInfoNoStore} from '../OrganizationPage/OrganizationInfo';
import withLocalStore from './localStore';

const RootPath = 'vacancies/';

const OrganizationInfo = withLocalStore(OrganizationInfoNoStore);

const SubRoutes = [
  {
    path: 'vacInfo',
    alwaysOn: true,
    element: new OrganizationInfo('#vacancy_org_info'),
  },
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
