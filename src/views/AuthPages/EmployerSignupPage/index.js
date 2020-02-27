import {Page} from '../../../Page';
import template from './pug/index.pug';
import '../style.sass';
import {withForm} from '../../../ulils/withForm';
import {uuid} from '../../../ulils';
import {isEmail, isPhoneNumber, isSlavicName} from '../../../ulils/validators';

/**
 * Employer signup page
 */
class EmployerSignupPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}

EmployerSignupPage = withForm(EmployerSignupPage,
    {
      companyName: {
        id: uuid(),
        required: true,
      },
      site: {
        id: uuid(),
        required: true,
      },
      city: {
        id: uuid(),
        required: true,

      },
      firstName: {
        id: uuid(),
        required: true,
        validator: isSlavicName,
      },
      lastName: {
        id: uuid(),
        required: true,
        validator: isSlavicName,
      },
      phone: {
        id: uuid(),
        required: true,
        validator: isPhoneNumber,
      },
      email: {
        id: uuid(),
        required: true,
        validator: isEmail,
      },
      companyType: {
        id: uuid(),
        required: true,
      },
      amountOfWorkers: {
        id: uuid(),
        required: true,
      },
    },
    {
      id: uuid(),
    },
    (a, b) => {
      console.log(a, b);
    },
    (a, b) => {
      console.log('fail');
    },
);

export {
  EmployerSignupPage,
};
