import {OrganizationInfoNoStore} from '../OrganizationPage/OrganizationInfo';
import ResponsibilitiesRoutes from './responsibilities/routes';
import RequirementsRoutes from './requirements/routes';
import ConditionsRoutes from './conditions/routes';
// import MainSkillsRoutes from './mainskills/routes';
import withLocalStore from './localStore';
const RootPath = 'vacancies/';

const OrganizationInfo = withLocalStore(OrganizationInfoNoStore);
const SubRoutes = [
  {
    path: 'vacInfo',
    alwaysOn: true,
    element: new OrganizationInfo('#vacancy_org_info'),
  },
  ...ResponsibilitiesRoutes,
  ...RequirementsRoutes,
  ...ConditionsRoutes,
  // ...MainSkillsRoutes,
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
