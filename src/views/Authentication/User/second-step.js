import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index2.pug';
import {uuid, currentSession, withForm, request} from '../../../ulils';
import {isLogin, isPassword} from '../../../ulils/validators';
import {Navigator} from '../../../Navigator';
// import ws from '../../../ws';

/**
 * sign in or sign up subpage
 */
class SecondStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

SecondStep = withForm(SecondStep, {
  login: {
    id: uuid(),
    required: true,
    validator: isLogin,
    update: (e,v) => {
      return v.trim();
    },
    warnMessage: 'Имя пользователя состоит из латинских букв и цифр, а также "_" и "." Длина логина не менее 6 и не более 20',
  },
  password: {
    id: uuid(),
    required: true,
    validator: isPassword,
    update: (e,v) => {
      return v.trim();
    },
    warnMessage: 'Длина пароля от 8 до 30 символов. Состоит из цифр, латинских букв и симоволов "_", "."',
  },
},
{
  id: uuid(),
},
(form, page) => {
  trySignIn(form)
      .then(async (r) => {
        try {
          const user = await r.json();
          console.log(user);
          currentSession.session = {
            ...user,
            role: user.role.toUpperCase(),
          };
          // ws();
          Navigator.showPage('/index');
        } catch (e) {
          console.log(e, 1);
          alert('Внутренняя ошибка. Повторите попытку позднее');
        }
      })
      .catch(
          (e) => {
            trySignUp({
              ...form,
              'firstName': 'Безымянный',
              'lastName': 'Пользователь',
            })
                .then(async (r) => {
                  trySignIn(form)
                      .then(async (r) => {
                        try {
                          const user = await r.json();
                          console.log(user);
                          currentSession.session = {
                            ...user,
                            role: user.role.toUpperCase(),
                          };
                          // ws();
                          page.props.requestNext();
                        } catch (e) {
                          console.log(e, 2);
                          alert('Внутренняя ошибка. ' +
                            'Повторите попытку позднее');
                        }
                      })
                      .catch(
                          (r) => {console.log(r, 3);
                          alert('Внутренняя ошибка. ' +
                            'Повторите попытку позднее')},
                      );
                })
                .catch((r) => {
                  console.log(r, 4);
                  alert('Пользователь уже существует или неверный пароль')
                });
          },
      );
},
);

const trySignUp = (form) => new Promise((resolve, reject) => {
  request
      .post('/api/users', form)
      .then((r) => {
        if (r.status === 201) {
          resolve(r);
        } else {
          reject(r);
        }
      }).catch(reject);
},
);
const trySignIn = (form) => new Promise((resolve, reject) => {
  request
      .post('/api/users/login', form)
      .then((r) => {
        if (r.status === 201) {
          resolve(r);
        } else {
          reject(r);
        }
      }).catch(reject);
},
);
export {SecondStep};
