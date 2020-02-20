'use strict';

import { Page } from '../../../Page'
import template from './EmployerSignupPage.pug'
import { EmployerSignupForm } from './EmployerSignupForm';
import '../style.css'

export class EmployerSignupPage extends Page {

    render() {
        this.container.innerHTML = template();

        this.form = new EmployerSignupForm();
    }
}