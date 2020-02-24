import {Page} from '../../../Page';
import {withForm} from '../../../ulils/withForm';
import template from './pug/index.pug';
import '../style.css';
import {uuid} from '../../../ulils';
import {isLogin, isPassword} from '../../../ulils/validators';
import {requestSignIn} from '../../../ulils/postRequest';
import {Navigator} from '../../../Navigator';

/**
 * User login page
 */
class LoginPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}
const inputFields = {
  password: {
    id: uuid(),
    required: true,
    validator: isPassword,
    warnMessage: 'Пароль должен содержать ' +
        'хотя бы 8 символов, одну заглавную букву и цифру',
  },
  userName: {
    id: uuid(),
    required: true,
    validator: isLogin,
  },
};
LoginPage = withForm(LoginPage, inputFields, {
  id: uuid(),
},
(data) => {
  requestSignIn(data.userName, data.password)
      .then( () => {
        document.cookie = `reg_data=${data.userName}:::::${data.password}`;
        window.isAuthenticated = true;
        Navigator.updateAllPages();
        Navigator.showPage('index');
      })
      .catch(() => alert('Неверные логин или пароль!'));
},
(fields) => {
  console.log('fail');
},
);
export {
  LoginPage,
};
