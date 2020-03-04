import './style.sass';
import './auth-elements.sass';
import {Page} from '../../Page';
import template from './pug/index2.pug';
import {uuid, currentSession, withForm, request} from '../../ulils';
import {isLogin, isPassword} from '../../ulils/validators';
import {Navigator} from '../../Navigator';

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
    warnMessage: 'На данный момент поддерживается только логин. ' +
        '/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\\d.-]{5,19}$/',
  },
  password: {
    id: uuid(),
    required: true,
    validator: isPassword,
    warnMessage: '/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/',
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
          currentSession.session = user.id;
          Navigator.showPage('/index');
        } catch (e) {
          console.log(e);
          alert('Внутренняя ошибка. Повторите попытку позднее');
        }
      })
      .catch(
          (e) => {
            trySignUp({
              ...form,
              'first-name': 'Безымянный',
              'last-name': 'Пользователь',
            })
                .then(async (r) => {
                  trySignIn(form)
                      .then(async (r) => {
                        try {
                          const user = await r.json();
                          currentSession.session = user.id;
                          page.props.requestNext();
                        } catch (e) {
                          console.log(e);
                          alert('Внутренняя ошибка. ' +
                            'Повторите попытку позднее');
                        }
                      })
                      .catch(
                          (r) => alert('Внутренняя ошибка. ' +
                            'Повторите попытку позднее'),
                      );
                })
                .catch(console.log)
                .catch((r) =>
                  alert('Пользователь уже существует или неверный пароль'));
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
