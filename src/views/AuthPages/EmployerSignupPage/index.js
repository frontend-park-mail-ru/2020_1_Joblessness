import '../style.sass';
import {Page} from '../../../Page';
import template from './pug/index.pug';
import {uuid, withForm, validators} from '../../../ulils';

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
        validator: validators.isSlavicName,
      },
      lastName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
      },
      phone: {
        id: uuid(),
        required: true,
        validator: validators.isPhoneNumber,
      },
      email: {
        id: uuid(),
        required: true,
        validator: validators.isEmail,
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
    (e, page) => {
      console.log(e, page);
    },
    (a, b) => {
      console.log('fail');
    },
);

export {
  EmployerSignupPage,
};
