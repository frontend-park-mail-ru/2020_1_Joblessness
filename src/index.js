'use strict';
import '@babel/polyfill';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {
  CreateSummaryPage,
  CreateVacancyPage,
  UserPage,
  LoginPage,
  EmployerSignupPage,
  EmployeeSignupPage,
  IndexPage,
  Footer,
  Header,
  NotFoundPage, VacancyListPage,
} from './views';

/**
 * App
 */
class App {
  /**
     * Создание неизменяемых элементов, таких как хедер и футер
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
      'index': new IndexPage('#root'),
      'login': new LoginPage('#root'),
      'signup/employee': new EmployeeSignupPage('#root'),
      'signup/employer': new EmployerSignupPage('#root'),
      '404': new NotFoundPage('#root'),
      '_header': header,
      '_footer': footer,
    };
    Navigator.addRoutes(routes);
    header.requestRender();
    footer.requestRender();
    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'index');
  }
}
const createApp = async () => {
  await loginOnReload();
  new App();
};
createApp();
