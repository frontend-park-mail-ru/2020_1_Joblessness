import '@babel/polyfill';
import './style.sass';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {
  CreateSummaryPage,
  UserPage,
  UserSubRoutes,
  VacancyPage,
  Header,
  NotFoundPage,
  VacancyListPage,
  SummaryPage,
  CreateSummaryRoutes,
} from './views';
import ORGANIZATIONS_ROUTES from './views/OrganizationPage/routes'
import CREATE_VACANCY_ROUTES from './views/NewCreateVacancyPage/routes'
import SIGNUP_ROUTES from './views/NewSignUp/routes'
import SEARCH_ROUTES from './views/SearchPage/routes'
import {RootElement} from './RootElement';

/**
 * App
 */
class App {
  /**
   * Init everything
   */
  constructor() {
    console.log('Application was created');

    const routes = [
      {
        path: 'root',
        alwaysOn: true,
        element: new RootElement('#holder'),
        childRoutes: [
          {
            path: 'header',
            alwaysOn: true,
            element: new Header('#nav-elements'),
          },
        ],
      },
      ...SEARCH_ROUTES,
      ...SIGNUP_ROUTES,
      ...ORGANIZATIONS_ROUTES,
      ...CREATE_VACANCY_ROUTES,
      {
        path: 'vacancies',
        element: new VacancyListPage('#root'),
        childRoutes: [
          {
            path: 'vacancies/*',
            // @TODO fix vacancy page
            element: new VacancyPage('#root'),
          },
        ],
      },
      {
        path: 'users',
        element: new UserPage('#root'),
        childRoutes: UserSubRoutes,
      },
      {
        path: 'summaries/create',
        element: new CreateSummaryPage('#root'),
        childRoutes: CreateSummaryRoutes,
      },
      {
        path: 'summaries/*',
        element: new SummaryPage('#root'),
      },
      {
        path: '404',
        element: new NotFoundPage('#root'),
      },
    ];
    Navigator.addRoutes(routes);

    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage(loc, true, true);
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
