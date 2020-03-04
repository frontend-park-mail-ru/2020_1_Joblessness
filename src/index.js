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
  EmployeeSignUpPage,
  IndexPage,
  Footer,
  UserSubRoutes,
  VacancyPage,
  Header,
  NotFoundPage,
  VacancyListPage, SummaryPage, NewSignUp,
} from './views';
import {
  FirstStepI,
  SecondStepI,
  ThirdStepI,
  FifthStepI,
  ForthStepI,
} from './views/NewSignUp'
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

    const header = new Header('#holder');

    const footer = new Footer('#holder');

    const routes = [
      {
        path: "any",
        element: new RootElement('#holder'),
        childRoutes: [
          {
            path: "any",
            element: new Header('#nav-elements')
          },
        ]
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
            //@TODO fix vacancy page
            element: new VacancyPage('#root'),
          },
        ]
      },
      {
        path: 'users',
        element: new UserPage('#root'),
        childRoutes: UserSubRoutes,
      },
      {
        path: 'summaries/create',
        element: new CreateSummaryPage('#root'),
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
        element:  new NewSignUp('#root'),
        childRoutes: [
          {
            path: '',
            exact: true,
            element: FirstStepI,
          },
          {
            path: '/',
            exact: true,
            element: FirstStepI,
          },
          {
            path: 'start',
            element: SecondStepI,
          },
          {
            path: 'name',
            element: ThirdStepI,
          },
          {
            path: 'tag',
            element: ForthStepI,
          },
          {
            path: 'next',
            element: FifthStepI,
          },
          {
            path: 'employer',
            element: new EmployerSignupPage('#_signup_steps'),
          },
        ]
      },
      {
        path: 'index',
        element: new IndexPage('#root'),
      },
      {
        path: '404',
        element: new NotFoundPage('#root'),
      }
    ];

    Navigator.addRoutes(routes);

    // footer.requestRender();// show Header
    // open current location
    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'signup/');
    // header.requestRender();// show Footer
    //@TODO root as Page component
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
