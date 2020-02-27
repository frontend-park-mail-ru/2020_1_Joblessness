import {Page} from '../../../Page';
import {withForm} from '../../../ulils/withForm';
import template from './pug/index.pug';
import '../style.sass';
import {uuid} from '../../../ulils';
import {isLogin, isPassword} from '../../../ulils/validators';
import {tryLogin} from './tryLogin';

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
tryLogin,
);
export {
  LoginPage,
};
