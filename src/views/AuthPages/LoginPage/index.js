import { Page } from '../../../Page'
import  { LoginForm } from './LoginForm';
import template from './LoginPage.pug'
import '../style.css'

export class LoginPage extends Page {

    render() {
        this.container.innerHTML = template();

        this.form = new LoginForm();
    }
}