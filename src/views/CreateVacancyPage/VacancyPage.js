'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './vacancy-page.pug';
import {validateRadio, validateCheckBox, withForm} from '../../ulils/withForm';
import {uuid} from '../../ulils';
import {isEmail, isPhoneNumber} from '../../ulils/validators';

/**
 * Vacancy creation page
 */
class VacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}

VacancyPage = withForm(VacancyPage,
    {
      vacancyName: {
        id: uuid(),
        required: true,
      },
      description: {
        id: uuid(),
        required: true,
      },
      mainSkills: {
        id: uuid(),
        required: true,
      },
      expectedIncomeFrom: {
        id: uuid(),
        required: true,
      },
      expectedIncomeTo: {
        id: uuid(),
        required: true,
      },
      expectedIncomeCurrency: {
        id: uuid(),
        required: true,
      },
      withTax: {
        id: uuid(),
        required: true,
        inputValidator: validateRadio,
      },
      cityName: {
        id: uuid(),
        required: true,
      },
      officeAddress: {
        id: uuid(),
        required: true,
      },
      showAddress: {
        id: uuid(),
        inputValidator: validateCheckBox,
      },
      vacancyManager: {
        id: uuid(),
        required: true,
      },
      notify: {
        id: uuid(),
        inputValidator: validateCheckBox,
      },
      showInVacancy: {
        id: uuid(),
        inputValidator: validateCheckBox,
      },
      email: {
        id: uuid(),
        required: true,
        validator: isEmail,
      },
      phone: {
        id: uuid(),
        required: true,
        validator: isPhoneNumber,
      },
      comment: {
        id: uuid(),
        required: true,
      },
    },
    {
      id: uuid(),
    },
    (d) => {
      console.log(d);
      // @TODO perform creation and open vacancy page
      fetch('http://91.210.170.6:8000/api/', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          ...d,
        },
      }).catch(console.log);
    },
    () => {
      console.log('fail');
    },
);
export {
  VacancyPage,
};
