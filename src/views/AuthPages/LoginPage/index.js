import {Page} from '../../../Page'
import {withForm} from '../../../ulils/withForm';
import template from './pug/index.pug'
import '../style.css'
import {uuid} from "../../../ulils";
import {isEmail, isLogin, isPassword, isPhoneNumber} from "../../../ulils/validators";

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
    userName: {
        id: uuid(),
        required: true,
        validator: isLogin
    }
};
LoginPage = withForm(LoginPage, inputFields, {
        id: uuid()
    },
    (data) => {
        //@TODO authorize
        fetch(' http://91.210.170.6:8000/api/users/login',
            {
                credentials: "include",
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    login: data.userName,
                    password: data.password,
                }
            })
            .then( r => r.text())
            .then((r) => {
                if(!r) {
                    alert('Неверный логин или пароль')
                } else {
                    // function getCookie(name) {
                    //     var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                    //     if (match) return match[2];
                    // }
                    // document.cookie = "session_id=SOMEVALUE"
                    // document.cookie = "session_i2d=SOMEVALUE"
                    console.log(document.cookie)
                }
            })
            .catch(() => alert('Невозможно соединиться с сервером'))
    },
    (fields) => {
        console.log('fail')
    }
);
export {
    LoginPage
}