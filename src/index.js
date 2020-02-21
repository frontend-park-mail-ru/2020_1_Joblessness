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
    Header
} from './views';

class App {
    /**
     * Создание неизменяемых элементов, таких как хедер и футер
     */
    constructor() {
        console.log("Application was created");
        new Header('body');
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
        };

        new Navigator({
            ResumePage,
            UserPage,
            VacancyPage,
            ShowVacancyPage,
            LoginPage,
            EmployerSignupPage,
            EmployeeSignupPage,
            ShowResumePage,
            IndexPage,
        }, routes, '.root');
        new Footer('body');
    }
}

window.addEventListener("load", function () {
    new App();
});