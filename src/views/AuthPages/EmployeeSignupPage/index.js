'use strict';

import { Page } from '../../../Page'
import template from './EmployeeSignupPage.pug'
import { EmployeeSignupForm } from './EmployeeSignupForm';
import '../style.css'

export class EmployeeSignupPage extends Page {

    constructor(container) {
        super(container);
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'employee-signup'
        } else if (lang === 'ru') {
            return 'Регистрация работодателя'
        }
    }

    componentDidMount = () => {
        this.form = new EmployeeSignupForm();
    };
    render() {
        return template()
    }

}