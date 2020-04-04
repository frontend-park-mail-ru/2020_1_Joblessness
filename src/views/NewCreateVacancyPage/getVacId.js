import {currentSession} from '../../ulils';

export const getVacId = () => {
  const name = location.pathname;
  return name.replace(/\D+/g, '')
};