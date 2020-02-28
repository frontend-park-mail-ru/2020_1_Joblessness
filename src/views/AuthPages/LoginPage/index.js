import '../style.sass';
import {Page} from '../../../Page';
import template from './pug/index.pug';
import {appendForm} from './appendForm';

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

LoginPage = appendForm(LoginPage);
export {
  LoginPage,
};
