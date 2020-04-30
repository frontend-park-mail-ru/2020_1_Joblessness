import {currentSession} from '../../ulils';

export const getUserId = () => {
  const name = location.pathname;

  if (name.startsWith('/users/')) {
    return Number(name
        .replace(/\D+/g, '')) ||
      currentSession.user.id;
  }
  return currentSession.user.id;
};
