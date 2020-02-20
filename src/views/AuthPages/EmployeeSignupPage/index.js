'use strict';

import { Page } from '../../../Page'
import template from './EmployeeSignupPage.pug'
import { EmployeeSignupForm } from './EmployeeSignupForm';
import '../style.css'

export class EmployeeSignupPage extends Page {

    render() {
        this.container.innerHTML = template();

        this.form = new EmployeeSignupForm();
    }
}