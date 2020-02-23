"use strict";
import "@babel/polyfill"
import { Navigator } from './Navigator.js';
import {
    ResumePage,
    UserPage,
    VacancyPage,
    ShowVacancyPage,
    LoginPage,
    EmployerSignupPage,
    EmployeeSignupPage,
    ShowResumePage,
    IndexPage,
    Footer,
    Header,
    NotFoundPage,
} from './views';
window.isAuthenticated = true
class App {
    /**
     * Создание неизменяемых элементов, таких как хедер и футер
     */
    constructor() {
        console.log("Application was created");
        const header = new Header('body');
        header.requestRender();
        let domBox = document.createElement("div");
        domBox.className = 'root';
        document.querySelector('body').appendChild(domBox);

        const routes = {
            'summaries/create': new ResumePage('.root'),
            'vacancies/create': new VacancyPage('.root'),
            'user': new UserPage('.root'),
            'index': new IndexPage('.root'),
            login: new LoginPage('.root'),
            'signup/employee': new EmployeeSignupPage('.root'),
            'signup/employer': new EmployerSignupPage('.root'),
            '404' : new NotFoundPage('.root'),
        };
        Navigator.addRoutes(routes);
        const loc = window.location.pathname.replace('/', '');
        Navigator.showPage( loc ? loc : 'index') ;
        const footer = new Footer('body');
        footer.requestRender('body')
    }
}
new App();