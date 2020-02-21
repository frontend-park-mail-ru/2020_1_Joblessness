"use strict";

import {getBus} from "./ulils/getBus";
import {
    EmployeeSignupPage,
    EmployerSignupPage,
    LoginPage,
    ResumePage,
    ShowVacancyPage,
    UserPage,
    VacancyPage,
} from './views';
import {IndexPage} from "./views/IndexPage";
import {hideAll} from "./ulils/showPage";
import {ShowResumePage} from "./views/ShowResumePage";

const routes = {
    createResume: showCreateResume,
    createVacancy: showCreateVacancy,
    userPage: showUserPage,
    index: showIndex,
    login: showLogin,
    employeeSignup: showEmployeeSignup,
    employerSignup: showEmployerSignup,
};

function showUserPage() {
    hideAll();
    getBus().pagesOnScreen.indexPage.showPage();
}

function showIndex() {
    hideAll();
    getBus().pagesOnScreen.indexPage.showPage();
}

function showLogin() {
    hideAll();
    getBus().pagesOnScreen.loginPage.showPage();
}

function showEmployeeSignup() {
    hideAll();
    getBus().pagesOnScreen.employeeSignupPage.showPage();
}

function showEmployerSignup() {
    hideAll();
    getBus().pagesOnScreen.employerSignupPage.showPage();
}

function showCreateVacancy() {
    hideAll();
    getBus().pagesOnScreen.vacancyPage.showPage();
}

function showCreateResume() {
    hideAll();
    getBus().pagesOnScreen.resumePage.showPage();
}

class Navigator_old {
    /**
     * Все страницы создаются здесь и помещаются в глобальный объект Bus
     */
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
            indexPage: this.indexPage,
            vacancyPage: this.vacancyPage,
            showVacancyPage: this.showVacancyPage,
            resumePage: this.resumePage,
            showResumePage: this.showResumePage,
            userPage: this.userPage,
            loginPage: this.loginPage,
            employerSignupPage: this.employerSignupPage,
            employeeSignupPage: this.employeeSignupPage,
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

    /**
     * Обработка нажатий на все ссылки с целью перехода на другую страницу
     */
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
    Navigator_old,
}
