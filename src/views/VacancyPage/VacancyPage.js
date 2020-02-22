'use strict';

import './style.css'
import { Page } from '../../Page.js';
import { VacancyForm } from './VacancyForms.js';
import template from './vacancy-page.pug';

class VacancyPage extends Page {
    constructor(container) {
        super(container);
        // this.form = new VacancyForm();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy'
        } else if (lang === 'ru') {
            return 'вакансии'
        }
    }
    componentDidMount = ()=> {
        this.form = new VacancyForm();
    };
    render() {
        return template();
    }
}

export {
    VacancyPage
}