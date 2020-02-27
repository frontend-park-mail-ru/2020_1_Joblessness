import {postRequest} from './postRequest';
import {Navigator} from '../Navigator';
import {currentSession} from './index';

/**
 * Отправляет запрос на авторизацию при загрузке страницы
 */
export const loginOnReload = () => {
  postRequest('/api/users/check', {})
      .then(async (r) => {
        if (r.status === 201) {
          try {
            const user = await r.json();
            currentSession.session = user.id;
            Navigator.updateAllPages();
          } catch (e) {
          // Empty body provided (probably)
            console.log(e);
          }
        }
      }).catch(console.log);
};
