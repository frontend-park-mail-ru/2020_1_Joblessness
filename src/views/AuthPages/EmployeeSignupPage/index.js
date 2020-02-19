'use strict';

import { Page } from '../../../Page'
import template from './EmployeeSignupPage.pug'
import { EmployeeSignupForm } from './EmployeeSignupForm';
import '../style.css'

export class EmployeeSignupPage extends Page {

    constructor() {
        super();

        this.form = new EmployeeSignupForm();
    }

    name(lang = 'en') {
        if (lang === 'en') {
            return 'employee-signup'
        } else if (lang === 'ru') {
            return 'Регистрация соискателя'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}