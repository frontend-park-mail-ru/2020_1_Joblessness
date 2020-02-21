"use strict";

import { getBus } from "./ulils/getBus";
import {
    ResumePage,
    UserPage,
    VacancyPage,
    ShowVacancyPage,
    LoginPage,
    EmployerSignupPage,
    EmployeeSignupPage,
} from './views';
import {IndexPage} from "./views/IndexPage";
import {hideAll} from "./ulils/showPage";
import {ShowResumePage} from "./views/ShowResumePage";

const routes = {
    createResume: showCreateResume,
    createVacancy: showCreateVacancy,
    index: showIndex,
    login: showLogin,
    employeeSignup: showEmployeeSignup,
    employerSignup: showEmployerSignup,
};

function showIndex() {
    hideAll();
    getBus().pagesOnScreen.indexPage.hidden = false;
}

function showLogin() {
    hideAll();
    getBus().pagesOnScreen.loginPage.hidden = false;
}

function showEmployeeSignup() {
    hideAll();
    getBus().pagesOnScreen.employeeSignupPage.hidden = false;
}

function showEmployerSignup() {
    hideAll();
    getBus().pagesOnScreen.employerSignupPage.hidden = false;
}

function showCreateVacancy() {
    hideAll();
    getBus().pagesOnScreen.vacancyPage.hidden = false;
}

function showCreateResume() {
    hideAll();
    getBus().pagesOnScreen.resumePage.hidden = false;
}

class Navigator {
    constructor() {
        // сюда добавляете свои страницы
        this.indexPage = new IndexPage('.root');
        this.vacancyPage = new VacancyPage('.root');
        this.showVacancyPage = new ShowVacancyPage('.root');
        this.resumePage = new ResumePage('.root');
        this.showResumePage = new ShowResumePage('.root');
        this.userPage = new UserPage('.root');
        this.loginPage = new LoginPage('.root');
        this.employerSignupPage = new EmployerSignupPage('.root');
        this.employeeSignupPage = new EmployeeSignupPage('.root');

        getBus().pagesOnScreen = {
            indexPage: this.indexPage.getDomElem(),
            vacancyPage: this.vacancyPage.getDomElem(),
            showVacancyPage: this.showVacancyPage.getDomElem(),
            resumePage: this.resumePage.getDomElem(),
            showResumePage: this.showResumePage.getDomElem(),
            userPage: this.userPage.getDomElem(),
            loginPage: this.loginPage.getDomElem(),
            employerSignupPage: this.employerSignupPage.getDomElem(),
            employeeSignupPage: this.employeeSignupPage.getDomElem(),
        };

        this.addNavEvents();
    }

    // родительский элемент
    parentDom() {
        return '#root';
    }

    // имя класса самого элемента
    domName() {
        return 'nav-bar'
    }

    addNavEvents() {
        document.body.addEventListener('click', (e) => {
            const {target} = e;

            if (target instanceof HTMLAnchorElement) {
                e.preventDefault();

                routes[target.dataset.page]();
            }
        });
    }
}

export {
    Navigator,
}
