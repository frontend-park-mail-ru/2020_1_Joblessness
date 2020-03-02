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
    const domBox = document.createElement('div');
    domBox.id = 'root';
    document.querySelector('#holder').appendChild(domBox);

    const footer = new Footer('#holder');

    const NewSignUpInstance = new NewSignUp('#root');
    const routes = [
      {
        path: 'summaries/create',
        element: new CreateSummaryPage('#root'),
      },
      {
        path: 'summaries/*',
        element: new SummaryPage('#root'),
      },
      {
        path: 'vacancies/create',
        element: new CreateVacancyPage('#root'),
      },
      {
        path: 'vacancies',
        element: new VacancyListPage('#root'),
      },
      {
        path: 'vacancies/*',
        element: new VacancyPage('#root'),
      },
      {
        path: 'users/*',
        element: new UserPage('#root'),
      },
      {
        path: 'login',
        element: new LoginPage('#root'),
      },
      {
        path: 'signup/employee',
        element:  new NewSignUp('#root'),
        childRoutes: [
          {
            path: '/first-step',
            element: FirstStepI,
          },
          {
            path: 'second-step',
            element: SecondStepI,
          },
          {
            path: 'third-step',
            element: ThirdStepI,
          },
          {
            path: 'forth-step',
            element: ForthStepI,
          },
          {
            path: 'fifth-step',
            element: FifthStepI,
          }
        ]
      },
      {
        path: 'index',
        element: new IndexPage('#root'),
      },
      {
        path: 'signup/employer',
        element: new EmployerSignupPage('#root'),
      },
      {
        path: '404',
        element: new NotFoundPage('#root'),
      }
      // '_header': header,
      // '_footer': footer,
    ];

    Navigator.addRoutes(routes);

    // header.requestRender();// show Footer
    // footer.requestRender();// show Header
    // open current location
    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'signup/employee');
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
