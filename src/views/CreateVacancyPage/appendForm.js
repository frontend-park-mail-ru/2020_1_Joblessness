import {uuid, withForm, validators} from '../../ulils';
import {validateCheckBox, validateRadio} from '../../ulils/withForm';
import {createVacancy} from './createVacancy';

export const appendForm = (Wrappee) => withForm(Wrappee,
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
        validator: validators.isEmail,
        warnMessage: 'Введите email для связи',
      },
      phone: {
        id: uuid(),
        required: true,
        validator: validators.isPhoneNumber,
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
    createVacancy,
);
