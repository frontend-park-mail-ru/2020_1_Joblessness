'use strict';

import './style.css'
import { Page } from '../../Page.js';
import { ShowVacancyForm } from './ShowVacancyForms.js';
import template from './show-vacancy-page.pug';

// смотри пояснения к резюме
class ShowVacancyPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy-show'
        } else if (lang === 'ru') {
            return 'показать вакансию'
        }
    }

    fillThePage() {

    }

    render() {
        return template();
    }
}

export {
    ShowVacancyPage
}