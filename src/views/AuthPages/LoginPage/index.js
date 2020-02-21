import { Page } from '../../../Page'
import { LoginForm } from './LoginForm';
import template from './LoginPage.pug'
import '../style.css'
import {VacancyForm} from "../../VacancyPage/VacancyForms";

export class LoginPage extends Page {

    constructor(container) {
        super(container);
        this.form = new LoginForm();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'login'
        } else if (lang === 'ru') {
            return 'Войти'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}