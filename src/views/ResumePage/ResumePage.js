"use strict";

import './style.css'
import {Page} from '../../Page.js';
import {ResumeForm} from './ResumeForm.js';
import template from "./resume-page.pug";

// наследуемся от страницы
class ResumePage extends Page {
    // просто возврат имени. Используется для определения, какую страницу отрисовывать
    // см showPage и page, там это используется
    name(lang = 'en') {
        if (lang === 'en') {
            return 'resume'
        } else if (lang === 'ru') {
            return 'резюме'
        }
    }

    addEventsOn() {

    }

    componentDidMount = () => {
        // this.settings = new FormSettings();
        this.form = new ResumeForm()
    };

    render() {
        return template();
    }
}

export {
    ResumePage
}