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
class CreateVacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}

CreateVacancyPage = withForm(CreateVacancyPage,
    {
      vacancyName: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите название вакансии',
      },
      description: {
        id: uuid(),
        required: true,
        warnMessage: 'Введите описание вакансии',
      },
      mainSkills: {
        id: uuid(),
        required: true,
        warnMessage: 'Какие навыки требуются от соискателя?',
      },
      expectedIncomeFrom: {
        id: uuid(),
        required: true,
        warnMessage: 'Минимальная зп',
      },
      expectedIncomeTo: {
        id: uuid(),
        required: true,
        warnMessage: 'Максимальная зп',
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
        warnMessage: 'Место работы',
      },
      officeAddress: {
        id: uuid(),
        required: true,
        warnMessage: 'Адрес вашего офиса',
      },
      showAddress: {
        id: uuid(),
        inputValidator: validateCheckBox,
      },
      vacancyManager: {
        id: uuid(),
        required: true,
        warnMessage: 'Контактное лицо',
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
        warnMessage: 'Введите email для связи',
      },
      phone: {
        id: uuid(),
        required: true,
        validator: isPhoneNumber,
        warnMessage: 'Телефон для связи',
      },
      comment: {
        id: uuid(),
        warnMessage: 'Прочая информация',
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
  CreateVacancyPage,
};
