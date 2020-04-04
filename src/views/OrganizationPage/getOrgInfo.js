import {currentSession} from '../../ulils';

export const getOrgId = () => {
  const name = location.pathname;

  if (name.startsWith('/organizations/')) {
    return name
        .replace(/\D+/g, '') ||
      currentSession.user.id;
  }
  return currentSession.user.id;
};