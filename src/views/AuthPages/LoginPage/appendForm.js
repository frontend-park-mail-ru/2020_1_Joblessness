import {uuid, withForm, validators} from '../../../ulils';
import {tryLogin} from './tryLogin';

export const appendForm = (Wrappee) => withForm(Wrappee, {
  password: {
    id: uuid(),
    required: true,
    validator: validators.isPassword,
    warnMessage: 'Введите пароль!',
  },
  userName: {
    id: uuid(),
    required: true,
    validator: validators.isLogin,
  },
},
{
  id: uuid(),
},
tryLogin,
);
