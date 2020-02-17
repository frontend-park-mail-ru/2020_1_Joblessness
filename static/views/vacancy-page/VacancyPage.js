"use strict";

import Page from "../../modules/Page.js";
import template from "./vacancy-page.pug";

// смотри пояснения к резюме
export default class VacancyPage extends Page {
    constructor() {
        super();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy'
        } else if (lang === 'ru') {
            return 'вакансии'
        }
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