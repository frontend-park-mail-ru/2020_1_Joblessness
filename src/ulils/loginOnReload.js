import {Navigator} from '../Navigator';
import {currentSession, request} from './index';

/**
 * Отправляет запрос на авторизацию при загрузке страницы
 */
export const loginOnReload = async () => {
  try {
    const r = await request.post('/api/users/check', {});
    if (r.status === 201) {
      try {
        const user = await r.json();
        currentSession.session = {
          ...user,
          role: user.role.toUpperCase(),
        };
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e)
  }
};
