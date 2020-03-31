import {OrganizationInfo} from './OrganizationInfo';
import LoadManagerRoutes from './OrganizationVacancies/loadManager';

import MainInfoRoutes from './OrganizationMainInfo/routes';
import VacanciesRoutes from './OrganizationVacancies/routes';

const RootPath = 'organizations/';

const SubRoutes = [
  {
    path: 'orgInfo',
    alwaysOn: true,
    element: new OrganizationInfo('#organization_org_info'),
  },
  ...MainInfoRoutes,
  ...VacanciesRoutes,
  ...LoadManagerRoutes,
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