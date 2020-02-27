import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.sass';
import {withForm} from '../../../ulils/withForm';
import {uuid, validators} from '../../../ulils';
import {onSignUp} from './onSignUp';

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
        warnMessage: 'Укажите имя',
      },
      lastName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
        warnMessage: 'Укажите Фамилию',
      },
      email: {
        id: uuid(),
        required: true,
        validator: validators.isEmail,
        warnMessage: 'Электронная почта',
      },
      phone: {
        id: uuid(),
        required: true,
        validator: validators.isPhoneNumber,
        warnMessage: 'Номер телефона',
      },
      password: {
        id: uuid(),
        required: true,
        validator: validators.isPassword,
        warnMessage: 'Придумайте пароль',
      },
      userName: {
        id: uuid(),
        required: true,
        validator: validators.isLogin,
        warnMessage: 'Придумайте никнейм',
      },
    },
    {
      id: uuid(),
    },
    onSignUp,
);
export {
  EmployeeSignupPage,
};
