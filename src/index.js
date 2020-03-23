import '@babel/polyfill';
import './style.sass';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {
  CreateSummaryPage,
  CreateVacancyPage,
  UserPage,
  LoginPage,
  EmployerSignupPage,
  IndexPage,
  UserSubRoutes,
  VacancyPage,
  Header,
  NotFoundPage,
  VacancyListPage,
  SummaryPage,
  NewSignUp,
  CreateSummaryRoutes,
  AuthSubRoutes,
} from './views';
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
      {
        path: 'vacancies/create',
        element: new CreateVacancyPage('#root'),
      },
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
        path: 'login',
        element: new LoginPage('#root'),
      },
      {
        path: 'signup',
        element: new NewSignUp('#root'),
        childRoutes: [
          ...AuthSubRoutes,
          {
            path: 'employer',
            element: new EmployerSignupPage('#_signup_steps'),
          },
        ],
      },
      {
        path: 'index',
        element: new IndexPage('#root'),
      },
      {
        path: '404',
        element: new NotFoundPage('#root'),
      },

    ];
    Navigator.addRoutes(routes);

    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'signup/');
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
