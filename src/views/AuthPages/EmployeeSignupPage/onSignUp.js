import {postRequest} from '../../../ulils/postRequest';
import {Navigator} from '../../../Navigator';
import {requestSignIn} from '../../../ulils/postRequest';
import {currentSession} from '../../../ulils';

export const onSignUp = (fields) => {
  postRequest('/api/users', {
    'password': fields.password,
    'first-name': fields.firstName,
    'login': fields.userName,
    'last-name': fields.lastName,
    'mail': fields.email,
    'phone-number': fields.phone,
  }).then((r) => {
    if (r.status === 201) {
      requestSignIn(fields.userName, fields.password)
          .then(async (sr) => {
            console.log(sr);
            if (sr.status === 201) {
              const user = await sr.json();
              // update session
              currentSession.session = user.id;
              // load user page by default
              Navigator.updateAllPages();
              Navigator.showPage(`users/${user.id}`);
            } else {
              alert('Невозможно войти в учетную запись');
            }
          })
          .catch(console.log);
    } else {
      alert('Пользователь уже существует');
    }
  }).catch((r) => {
    console.log(r);
  });
};
