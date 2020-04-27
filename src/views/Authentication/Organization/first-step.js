import {Page} from '../../../Page';
import template from './pug/index1.pug';
import {uuid, currentSession, withForm, request, requestManager} from '../../../ulils';
import {isLogin, isPassword} from '../../../ulils/validators';
import {Navigator} from '../../../Navigator';

/**
 * sign in or sign up subpage
 */
class FirstStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

FirstStep = withForm(FirstStep, {
  login: {
    id: uuid(),
    required: true,
    validator: isLogin,
    warnMessage: 'Имя пользователя состоит из латинских букв и цифр, а также "_" и "." Длина логина не менее 6.',
  },
  password: {
    id: uuid(),
    required: true,
    validator: isPassword,
    warnMessage: 'Пароль состоит из латинских букв и цифр, длина не менее 8. Должен содержать хотя бы 1 цифру и Заглавную букву.',
  },
},
{
  id: uuid(),
},
(form, page) => {
  requestManager.trySignIn(form)
      .then(async (r) => {
        try {
          const user = await r.json();
          console.log(user);
          currentSession.session = {
            ...user,
            role: user.role.toUpperCase(),
          };
          Navigator.showPage('/index');
        } catch (e) {
          console.log(e);
          alert('Внутренняя ошибка. Повторите попытку позднее');
        }
      })
      .catch(
          (e) => {
            requestManager.tryRegisterOrg({
              ...form,
              'name': 'Безымянная Компания',
            })
                .then(async (r) => {
                  requestManager.trySignIn(form)
                      .then(async (r) => {
                        try {
                          const user = await r.json();
                          console.log(user);
                          currentSession.session = {
                            ...user,
                            role: user.role.toUpperCase(),
                          };
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
export {FirstStep};
