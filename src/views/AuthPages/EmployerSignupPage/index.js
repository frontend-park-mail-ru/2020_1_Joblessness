'use strict';

import { Page } from '../../../Page'
import template from './EmployerSignupPage.pug'
import { EmployerSignupForm } from './EmployerSignupForm';
import '../style.css'

export class EmployerSignupPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'employer-signup'
        } else if (lang === 'ru') {
            return 'Регистрация работника'
        }
    }

    componentDidMount = () => {
        this.form = new EmployerSignupForm();
    };
    render() {
        return template()
    }

}