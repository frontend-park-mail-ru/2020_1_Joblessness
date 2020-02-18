'use strict';

import { Page } from '../../Page'
import template from './LoginPage.pug'

export class LoginPage extends Page {

    name(lang = 'en') {
        if (lang === 'en') {
            return 'Login'
        } else if (lang === 'ru') {
            return 'Вход'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}