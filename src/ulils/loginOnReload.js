import {Navigator} from '../Navigator';
import {currentSession, request} from './index';

/**
 * Отправляет запрос на авторизацию при загрузке страницы
 */
export const loginOnReload = () => {
  request.post('/api/users/check', {})
    .then(async (r) => {
      if (r.status === 201) {
        try {
          const user = await r.json();
          currentSession.session = {
            ...user,
            role : user.role.toUpperCase(),
          };
        } catch (e) {
          console.log(e);
        }
      }
    })
    .catch(() => {})
};
