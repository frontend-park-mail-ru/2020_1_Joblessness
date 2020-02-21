"use strict";

import './style.css'
import { Page } from '../../Page.js';
import { ShowResumeForm } from './ShowResumeForm.js';
import template from "./show-resume-page.pug";

// наследуемся от страницы
class ShowResumePage extends Page {
    constructor(container) {
        super(container);
        // this.settings = new FormSettings()
        // this.form = new ResumePage()
    }

    // просто возврат имени. Используется для определения, какую страницу отрисовывать
    // см showPage и page, там это используется
    name(lang='en') {
        if (lang === 'en') {
            return 'show-resume'
        } else if (lang === 'ru') {
            return 'Показать резюме'
        }
    }

    render() {
        return template();
    }
}

export {
    ShowResumePage
}