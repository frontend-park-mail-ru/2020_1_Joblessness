"use strict";

import { Page } from '../../Page.js';

// наследуемся от страницы
export class ResumePage extends Page {
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

    template() {
        return `<div>РЕЗЮМЕ</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}