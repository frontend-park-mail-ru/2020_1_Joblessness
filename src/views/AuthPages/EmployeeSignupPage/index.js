import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.sass';
import {appendForm} from './appendForm';

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
// validation and post request
EmployeeSignUpPage = appendForm(EmployeeSignUpPage);

export {
  EmployeeSignUpPage,
};
