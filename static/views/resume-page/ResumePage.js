"use strict";

import Page from './../../modules/Page.js';
import template from "./resume-page.pug";

// наследуемся от страницы
export default class ResumePage extends Page {
    constructor() {
        // вызов родительского конструктора
        super();
    }

    // просто возврат имени. Используется для определения, какую страницу отрисовывать
    // см showPage и page, там это используется
    name(lang='en') {
        if (lang === 'en') {
            return 'resume'
        } else if (lang === 'ru') {
            return 'резюме'
        }
    }

    addEventsOn() {

    }

    // template() {
    //     let vacancyForm = ``
    //     return `<div>РЕЗЮМЕ</div>`;
    // }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}