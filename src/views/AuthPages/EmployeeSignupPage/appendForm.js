import {uuid, validators, withForm} from '../../../ulils';
import {onSignUp} from './onSignUp';

/**
 * Apply withForm wrapper to EmployeeSignUpPage
 * @param {EmployeeSignUpPage} Wrappee
 * @return {EmployeeSignUpPage}
 */
export const appendForm = (Wrappee) => withForm(Wrappee,
    {
      firstName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
        warnMessage: 'Имя должно начинаться с заглавной буквы ' +
          'и содержать только кириллицу',
      },
      lastName: {
        id: uuid(),
        required: true,
        validator: validators.isSlavicName,
        warnMessage: 'Фамилия должна начинаться с заглавной буквы ' +
          'и содержать только кириллицу',
      },
      email: {
        id: uuid(),
        required: true,
        validator: validators.isEmail,
        warnMessage: 'Электронная почта. Например example@test.com',
      },
      phone: {
        id: uuid(),
        required: true,
        validator: validators.isPhoneNumber,
        warnMessage: 'Номер телефона. Например 89123456789',
      },
      password: {
        id: uuid(),
        required: true,
        validator: validators.isPassword,
        warnMessage: 'Пароль должен содержать ' +
          'хотя бы 8 символов, одну заглавную букву и цифру и ' +
          'состоять из латинских символов',
      },
      userName: {
        id: uuid(),
        required: true,
        validator: validators.isLogin,
        warnMessage: 'Придумайте никнейм',
      },
    },
    {
      id: uuid(),
    },
    onSignUp,
);
