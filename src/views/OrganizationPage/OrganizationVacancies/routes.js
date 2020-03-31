import {OrganizationVacanciesPage} from './index';
import {CreateVacancyButton} from './CreateVacancyButton';

const ROUTES = [
  {
    path: 'orgVacancies',
    innerPath: 'orgVacancies',
    alwaysOn: true,
    element: new OrganizationVacanciesPage('#organization_org_vacancies'),
    childRoutes: [
      {
        path: 'any',
        alwaysOn: true,
        element: new CreateVacancyButton('#create-vacancy-holder')
      }
    ]
  },
];

export default ROUTES