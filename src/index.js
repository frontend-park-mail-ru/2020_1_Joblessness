"use strict";

import { withBus as Navigator } from './Navigator.js';
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
            createResume: 'ResumePage',
            createVacancy: 'VacancyPage',
            userPage: 'UserPage',
            index: 'IndexPage',
            login: 'LoginPage',
            employeeSignup: 'EmployeeSignupPage',
            employerSignup: 'EmployerSignupPage',
            '404' : 'NotFoundPage',
        };

        const nav = new Navigator({
            ResumePage,
            UserPage,
            VacancyPage,
            ShowVacancyPage,
            LoginPage,
            EmployerSignupPage,
            EmployeeSignupPage,
            ShowResumePage,
            IndexPage,
            NotFoundPage,
        }, routes, '.root');
        const loc = window.location.pathname.replace('/', '');
        nav.showPage( loc ? loc : 'index') ;
        const footer = new Footer('body');
        footer.requestRender('body')
    }
}
new App();