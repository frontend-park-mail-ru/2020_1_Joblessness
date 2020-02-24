import {postRequest} from '../../../ulils/postRequest';
import {Navigator} from '../../../Navigator';
import {requestSignIn} from '../../../ulils/postRequest';

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
          .then(() => {
            document.cookie =
            `reg_data=${fields.userName}:::::${fields.password}`;
            window.isAuthenticated = true;
            Navigator.updateAllPages();
            Navigator.showPage('index');
          })
          .catch(() => alert('Невозможно войти в учетную запись'));
    } else {
      alert('Пользователь уже существует');
    }
  }).catch((r) => {
    console.log(r);
  });
};
