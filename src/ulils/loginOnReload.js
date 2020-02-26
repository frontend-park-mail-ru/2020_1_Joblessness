import {postRequest} from './postRequest';
import {Navigator} from '../Navigator';

/**
 * Отправляет запрос на авторизацию при загрузке страницы
 */
export const loginOnReload = () => {
  postRequest('/api/users/check', {}).then(async (r) => {
    if (r.status === 201) {
      window.isAuthenticated = true;
      const user = await r.json();
      window.userId = user.id;
      Navigator.updateAllPages();
    }
  }).catch(console.log);
};
