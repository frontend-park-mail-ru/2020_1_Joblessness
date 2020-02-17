"use strict";

import showPage from './../ulils/showPage.js';
import VacancyPage from './../views/vacancy-page/VacancyPage.js';
import ResumePage from "../views/resume-page/ResumePage.js";

export default class Navigator {
    constructor() {
        // сюда добавляете свои страницы
        this.vacancyPage = new VacancyPage();
        this.resumePage = new ResumePage();

        this.render();

        this.addNavEvents();
    }

    // родительский элемент
    parentDom() {
        return '#app-box';
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
        `;
    }

    // создает сам dom элемент
    render() {
        let domBox = document.createElement("div");
        domBox.className = `${this.domName()}`;
        document.querySelector("#app-box").appendChild(domBox);
        domBox.innerHTML = this.htmlTemplate();
    }

    // здесь определяется событие перехода на страницу. querySelector позволяет определить элемент по классу
    addNavEvents() {
        document.querySelector(`.to-page-${this.vacancyPage.name('en')}`)
            .addEventListener('click', () => showPage(this.vacancyPage.domName()));
        document.querySelector(`.to-page-${this.resumePage.name('en')}`)
            .addEventListener('click', () => showPage(this.resumePage.domName()));
    }
}
