import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.sass';
import {appendWithForm} from './appendWithForm';

/**
 * Emplyee sign up page
 */
class EmployeeSignUpPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props.inputFields);
  }
}

EmployeeSignUpPage = appendWithForm(EmployeeSignUpPage);

export {
  EmployeeSignUpPage,
};
