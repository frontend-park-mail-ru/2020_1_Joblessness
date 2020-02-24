'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {validateRadio, validateSelect, withForm} from '../../ulils/withForm';
import {uuid} from '../../ulils';
import {isDay, isMonthId, isPhoneNumber,
  isSlavicName, isYear} from '../../ulils/validators';

/**
 * summary creation forms
 */
class SummaryPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template(this.props.inputFields);
  }
}

SummaryPage = withForm(SummaryPage,
    {
      firstName: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Ваше имя',
        validator: isSlavicName,
      },
      lastName: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Вашу фамилию',
        validator: isSlavicName,
      },
      phone: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Ваш номер телефона',
        validator: isPhoneNumber,
      },
      city: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите город, в котором ищете работу',
      },
      birthDay: {
        id: uuid(),
        required: true,
        warnMessage: 'Дата рождения',
        validator: isDay,
      },
      birthMonth: {
        id: uuid(),
        inputValidator: validateSelect,
        validator: isMonthId,
      },
      birthYear: {
        id: uuid(),
        required: true,
        warnMessage: 'Год рождения',
        validator: isYear,
      },
      sex: {
        id: uuid(),
        required: true,
        inputValidator: validateRadio,
        warnMessage: 'Выберите Ваш пол',
      },
      citizenship: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите, гражданином какой(их) стран Вы являетесь',
      },
      experience: {
        id: uuid(),
      },
      higherEducation: {
        id: uuid(),
      },
      secondaryEducation: {
        id: uuid(),
      },
    },
    {
      id: uuid(),
    },
    (d) => {
      console.log(d);
      fetch('http://91.210.170.6:8000/api/summaries/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          summary: {
            ...d, // @TODO form real summary
          },
        },
      });
    });
export {
  SummaryPage,
};
