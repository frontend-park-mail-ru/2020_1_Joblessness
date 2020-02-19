'use strict';

import { Page } from '../../../Page'
import template from './LoginPage.pug'
import  { LoginForm } from './LoginForm';
import '../style.css'

export class LoginPage extends Page {

    constructor() {
        super();

        this.form = new LoginForm();
    }

    name(lang = 'en') {
        if (lang === 'en') {
            return 'login'
        } else if (lang === 'ru') {
            return 'Вход'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}