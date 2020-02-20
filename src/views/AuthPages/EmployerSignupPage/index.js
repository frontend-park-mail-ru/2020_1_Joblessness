'use strict';

import { Page } from '../../../Page'
import template from './EmployerSignupPage.pug'
import { EmployerSignupForm } from './EmployerSignupForm';
import '../style.css'

export class EmployerSignupPage extends Page {

    constructor(container) {
        super(container);
        this.form = new EmployerSignupForm();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'employer-signup'
        } else if (lang === 'ru') {
            return 'Регистрация работника'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }

}