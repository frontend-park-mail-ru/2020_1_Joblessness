import './style.css';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {validateRadio, validateSelect, withForm} from '../../ulils/withForm';
import {uuid} from '../../ulils';
import {
  isDay, isEmail, isMonthId, isPhoneNumber,
  isSlavicName, isYear,
} from '../../ulils/validators';
import {createSummary} from './createSummary';

/**
 * summary creation forms
 */
class CreateSummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props.inputFields);
  }
}

CreateSummaryPage = withForm(CreateSummaryPage,
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
        inputValidator: validateRadio,
        warnMessage: 'Выберите Ваш пол',
      },
      email: {
        id: uuid(),
        validator: isEmail,
        warnMessage: 'Укажите почту',
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
    createSummary,
);
export {
  CreateSummaryPage,
};
