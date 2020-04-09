import '@babel/polyfill';
import './style.sass';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {Header, NotFoundPage} from './views';
import ORGANIZATIONS_ROUTES from './views/OrganizationPage/routes';
import CREATE_VACANCY_ROUTES from './views/NewCreateVacancyPage/routes';
import CREATE_SUMMARY_ROUTES from './views/CreateSummaryPage/routes';
import USER_ROUTES from './views/NewUserPage/routes';
import SIGNUP_ROUTES from './views/NewSignUp/routes';
import SEARCH_ROUTES from './views/SearchPage/routes';
import RESPONSES_ROUTES from './views/Responses/routes';
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
      ...RESPONSES_ROUTES,
      ...SEARCH_ROUTES,
      ...SIGNUP_ROUTES,
      ...USER_ROUTES,
      ...ORGANIZATIONS_ROUTES,
      ...CREATE_SUMMARY_ROUTES,
      ...CREATE_VACANCY_ROUTES,
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
  // currentSession.session = {id: 3, role : 'ORGANIZATION'};
  // currentSession.session = {id: 2, role: 'PERSON'}
  new App();
};
createApp();
