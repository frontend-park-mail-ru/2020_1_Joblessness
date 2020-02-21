'use strict';

import './style.css'
import { Page } from '../../Page.js';
import template from './ShowVacanciesListPage.pug';

// смотри пояснения к резюме
class ShowVacanciesListPage extends Page {
    constructor(container) {
        super(container);
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy-list-show'
        } else if (lang === 'ru') {
            return 'список вакансий'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}

export {
    ShowVacanciesListPage
}
