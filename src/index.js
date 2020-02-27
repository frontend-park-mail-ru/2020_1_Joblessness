'use strict';
import '@babel/polyfill';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import './style.sass';
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
  VacancyListPage, SummaryPage,
} from './views';

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

    const routes = {
      'summaries/create': new CreateSummaryPage('#root'),
      'vacancies/create': new CreateVacancyPage('#root'),
      'vacancies': new VacancyListPage('#root'),
      'users/*': new UserPage('#root'),
      'vacancies/*': new VacancyPage('#root'),
      'summaries/*': new SummaryPage('#root'),
      'index': new IndexPage('#root'),
      'login': new LoginPage('#root'),
      'signup/employee': new EmployeeSignUpPage('#root'),
      'signup/employer': new EmployerSignupPage('#root'),
      '404': new NotFoundPage('#root'),
      '_header': header,
      '_footer': footer,
    };

    Navigator.addRoutes(routes);

    header.requestRender();// show Footer
    footer.requestRender();// show Header
    // open current location
    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'index');
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
