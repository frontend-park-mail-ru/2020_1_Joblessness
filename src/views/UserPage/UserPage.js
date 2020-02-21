'use strict';

import './style.css'
import { Page } from '../../Page.js';
import template from './vacancy-page.pug';

class UserPage extends Page {
    constructor(container) {
        super(container);
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'user-page'
        } else if (lang === 'ru') {
            return 'Страница Пользователя'
        }
    }
    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}

export {
    UserPage
}