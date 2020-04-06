import {OrganizationVacanciesPage} from './index';
import {CreateVacancyButton} from './CreateVacancyButton';


const ROOT_ELEMENT = new OrganizationVacanciesPage('#organization_org_vacancies');
export const DEF_ROUTES = [{
  path: 'any',
  alwaysOn: true,
  element: new CreateVacancyButton('#create-vacancy-holder'),
}];
const ROUTES = [
  {
    path: 'orgVacancies',
    innerPath: 'orgVacancies',
    alwaysOn: true,
    element: ROOT_ELEMENT,
    childRoutes: [
      ...DEF_ROUTES,
    ],
  },
];
export const constructRoute = (childRoutes = []) => [
  {
    path: 'organizations/*',
    childRoutes: [
      {
        path: 'orgVacancies',
        innerPath: 'orgVacancies',
        alwaysOn: true,
        element: ROOT_ELEMENT,
        childRoutes,
      },
    ],
  },
];
export default ROUTES;
