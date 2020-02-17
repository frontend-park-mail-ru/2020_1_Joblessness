"use strict";

import { Page } from "../../Page.js";
import template from "./VacancyPage.pug";

// смотри пояснения к резюме
export class VacancyPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy'
        } else if (lang === 'ru') {
            return 'вакансии'
        }
    }

    addEventsOn() {

    }

    //  не нужен, если используется pug
    // template() { // заменить на pug
    //     return `<div>ВАКАНСИИ</div>`;
    // }

    // был this.template, когда не было pug
    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}