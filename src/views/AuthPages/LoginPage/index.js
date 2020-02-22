import {Page} from '../../../Page'
import {LoginForm, withForm} from './LoginForm';
import template from './pug/index.pug'
import '../style.css'
import {uuid} from "../../../ulils";
import {isEmail, isPassword, isPhoneNumber} from "../../../ulils/validators";

class LoginPage extends Page {

    render() {
        return template(this.props.inputFields)
    }
}

const inputFields = {
    password: {
        id: uuid(),
        required: true,
        validator: isPassword,
        warnMessage: 'Пароль должен содержать хотя бы 8 символов, одну заглавную букву и цифру',
    },
    emailOrPhone: {
        id: uuid(),
        required: true,
        validator: i => isEmail(i) || isPhoneNumber(i),
    }
};
LoginPage = withForm(LoginPage, inputFields, {
        id: uuid()
    },
    (data) => {
        //@TODO authorize
        fetch('/api/login',
            {
                method: 'POST',
                body: {
                    username: data.emailOrPhone,
                    password: data.password,
                }
            })
            .then(r => r.json())
            .then(console.log)//@TODO store cookie
            .catch(console.error)
    },
    () => {
        console.log('fail')
    }
);
export {
    LoginPage
}