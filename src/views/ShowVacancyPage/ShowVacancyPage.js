'use strict';

import './style.css'
import { Page } from '../../Page.js';
import { ShowVacancyForm } from './ShowVacancyForms.js';
import template from './show-vacancy-page.pug';

// смотри пояснения к резюме
class ShowVacancyPage extends Page {
    constructor() {
        super();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'show-vacancy'
        } else if (lang === 'ru') {
            return 'показать вакансию'
        }
    }

    fillThePage() {

    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}

export {
    ShowVacancyPage
}