import {request} from '../../../ulils';
import {currentSession} from '../../../ulils';
import {Navigator} from '../../../Navigator';

export const tryLogin = (data) => {
  request.login(data.userName, data.password)
      .then( async (r) => {
        if (r.status === 201) {
          try {
            const user = await r.json();
            currentSession.session = user.id;
            Navigator.updateAllPages();
            Navigator.showPage(`users/${user.id}`);
          } catch (e) {
            console.log(e);
            alert('Что-то пошло не так');
          }
        } else {
          alert('Невернные логин или пароль');
        }
      })
      .catch(() => alert('Невозможно соединиться с сервером'));
};
