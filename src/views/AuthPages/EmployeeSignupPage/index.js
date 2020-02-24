import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.css';
import {withForm} from '../../../ulils/withForm';
import {uuid, validators} from '../../../ulils';

/**
 * Emplyee signup page
 */
class EmployeeSignupPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}

EmployeeSignupPage = withForm(EmployeeSignupPage,
    {
      firstName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
      },
      lastName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
      },
      email: {
        id: uuid(),
        required: true,
        validator: validators.isEmail,
      },
      phone: {
        id: uuid(),
        required: true,
        validator: validators.isPhoneNumber,
      },
      password: {
        id: uuid(),
        required: true,
        validator: validators.isPassword,
      },
      userName: {
        id: uuid(),
        required: true,
        validator: validators.isLogin,
      },
    },
    {
      id: uuid(),
    },
    (fields) => {
      console.log(fields);
      fetch(' http://91.210.170.6:8000/api/users',
          {
            credentials: 'include',
            mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              'password': fields.password,
              'first-name': fields.firstName,
              'login': fields.userName,
              'last-name': fields.lastName,
              'mail': fields.email,
              'phone-number': fields.phone,
            },
          })
          .then( (r) => r.text())
          .then((r) => {
            console.log(r);
            if (!r) {
              alert('Неверный логин или пароль');
            } else {
              // function getCookie(name) {
              //     var match = document.
              //     cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
              //     if (match) return match[2];
              // }
              // document.cookie = "session_id=SOMEVALUE"
              // document.cookie = "session_i2d=SOMEVALUE"
              console.log(document.cookie);
            }
          })
          .catch(() => alert('Невозможно соединиться с сервером'));
    },
    () => {
      console.log('fail');
    },
);
export {
  EmployeeSignupPage,
};
