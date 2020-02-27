import {uuid, withForm, validators} from '../../ulils';
import {validateRadio, validateSelect} from '../../ulils/withForm';
import {createSummary} from './createSummary';

export const appendForm = (Wrappee) => withForm(Wrappee,
    {
      firstName: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Ваше имя',
        validator: validators.isSlavicName,
      },
      lastName: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Вашу фамилию',
        validator: validators.isSlavicName,
      },
      phone: {
        id: uuid(),
        required: true,
        warnMessage: 'Укажите Ваш номер телефона',
        validator: validators.isPhoneNumber,
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
        validator: validators.isDay,
      },
      birthMonth: {
        id: uuid(),
        inputValidator: validateSelect,
        validator: validators.isMonthId,
      },
      birthYear: {
        id: uuid(),
        required: true,
        warnMessage: 'Год рождения',
        validator: validators.isYear,
      },
      sex: {
        id: uuid(),
        inputValidator: validateRadio,
        warnMessage: 'Выберите Ваш пол',
      },
      email: {
        id: uuid(),
        validator: validators.isEmail,
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
