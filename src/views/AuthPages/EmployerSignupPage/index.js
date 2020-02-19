'use strict';

import { Page } from '../../../Page'
import template from './EmployerSignupPage.pug'
import '../style.css'

export class EmployerSignupPage extends Page {

    name(lang = 'en') {
        if (lang === 'en') {
            return 'employer-signup'
        } else if (lang === 'ru') {
            return 'Регистрация работодателя'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}