'use strict';
import '@babel/polyfill';
import {Navigator} from './Navigator.js';
import {
  CreateSummaryPage,
  CreateVacancyPage,
  UserPage,
  VacancyPage,
  LoginPage,
  EmployerSignupPage,
  EmployeeSignupPage,
  IndexPage,
  Footer,
  Header,
  NotFoundPage,
} from './views';
window.isAuthenticated = true;

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
    header.requestRender();
    const domBox = document.createElement('div');
    domBox.id = 'root';
    document.querySelector('#holder').appendChild(domBox);
    const footer = new Footer('#holder');
    footer.requestRender('body');
    const routes = {
      'summaries/create': new CreateSummaryPage('#root'),
      'vacancies/create': new CreateVacancyPage('#root'),
      'vacancies': new VacancyPage('#root'),
      'user': new UserPage('#root'),
      'index': new IndexPage('#root'),
      'login': new LoginPage('#root'),
      'signup/employee': new EmployeeSignupPage('#root'),
      'signup/employer': new EmployerSignupPage('#root'),
      '404': new NotFoundPage('#root'),
    };
    Navigator.addRoutes(routes);
    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage( loc ? loc : 'index');
  }
}
new App();
