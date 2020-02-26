/**
 * Отправляет запрос на авторизацию при загрузке страницы
 */
import {postRequest} from './postRequest';
import {Navigator} from '../Navigator';

export const loginOnReload = () => {
  // const c = getCookie('reg_data');
  // const [login, password] = c.split(':::::');
  // if ( login && password ) {
  postRequest('/api/users/check', {}).then(async (r) => {
    console.log(r);
    if (r.status === 201) {
      window.isAuthenticated = true;
      const user = await r.json();
      window.userId = user.id;
      Navigator.updateAllPages();
    } else {
      // delete cookie
      // document.cookie = 'reg_data=; ' +
      //   'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }).catch((r) => {

  });
};
/**
 * // https://www.w3schools.com/js/js_cookies.asp
 * @param {string}cname - cookie name to get
 * @return {string} cookie value
 */
export const getCookie = (cname) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
