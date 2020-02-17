"use strict";

import { Page } from "../../Page.js";

// смотри пояснения к резюме
export class VacancyPage extends Page {
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

    template() { // заменить на pug
        return `<div>ВАКАНСИИ</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}