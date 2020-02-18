"use strict";

import {showPage} from './ulils';
import {ResumePage, UserPage, VacancyPage} from './views';
import {LoginPage} from "./views/LoginPage";

export default class Navigator {
    constructor() {
        // сюда добавляете свои страницы
        this.vacancyPage = new VacancyPage();
        this.resumePage = new ResumePage();
        this.userPage = new UserPage();
        this.loginPage = new LoginPage();
        this.render();

        this.addNavEvents();
    }

    // родительский элемент
    parentDom() {
        return '#index';
    }

    // имя класса самого элемента
    domName() {
        return 'nav-bar'
    }

    // возвращает строку, которая в html описывает наполнение элемента
    htmlTemplate() {
        // здесь ссылка переход на страницу
        return `
            <button class="nav-btn to-page-${this.vacancyPage.name('en')}">${this.vacancyPage.name('ru')}</button>
            <button class="nav-btn to-page-${this.resumePage.name('en')}">${this.resumePage.name('ru')}</button>
            <button class="nav-btn to-page-${this.userPage.name('en')}">${this.userPage.name('ru')}</button>
            <button class="nav-btn to-page-${this.loginPage.name('en')}">${this.loginPage.name('ru')}</button>
        `;
    }

    // создает сам dom элемент
    render() {
        let domBox = document.createElement("div");
        domBox.className = `${this.domName()}`;
        document.querySelector("#root").appendChild(domBox);
        domBox.innerHTML = this.htmlTemplate();
    }

    // здесь определяется событие перехода на страницу. querySelector позволяет определить элемент по классу
    addNavEvents() {
        document.querySelector(`.to-page-${this.vacancyPage.name('en')}`)
            .addEventListener('click', () => showPage(this.vacancyPage.domName()));
        document.querySelector(`.to-page-${this.resumePage.name('en')}`)
            .addEventListener('click', () => showPage(this.resumePage.domName()));
        document.querySelector(`.to-page-${this.userPage.name('en')}`)
            .addEventListener('click', () => showPage(this.userPage.domName()));
        document.querySelector(`.to-page-${this.loginPage.name('en')}`)
            .addEventListener('click', () => showPage(this.loginPage.domName()));
    }
}
