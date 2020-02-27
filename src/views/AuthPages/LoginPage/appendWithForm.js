import {uuid} from '../../../ulils';
import {isLogin, isPassword} from '../../../ulils/validators';
import {withForm} from '../../../ulils/withForm';
import {tryLogin} from './tryLogin';

/**
 * Apply withForm wrapper to LoginPage
 * @param {LoginPage} Wrappee
 * @return {LoginPage}
 */
export const appendWithForm = Wrappee => withForm(Wrappee, {
    password: {
      id: uuid(),
      required: true,
      validator: isPassword,
      warnMessage: 'Пароль должен содержать ' +
        'хотя бы 8 символов, одну заглавную букву и цифру',
    },
    userName: {
      id: uuid(),
      required: true,
      validator: isLogin,
    },
  }, {
    id: uuid(),
  },
  tryLogin,
);