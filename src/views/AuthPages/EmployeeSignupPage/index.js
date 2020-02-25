import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.css';
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
    onSignUp,
    () => {
      console.log('fail');
    },
);
export {
  EmployeeSignupPage,
};
