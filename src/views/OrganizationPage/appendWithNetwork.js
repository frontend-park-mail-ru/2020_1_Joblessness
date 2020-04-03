// preload data
import {
  currentSession,
  request,
  requestManager,
  withNetwork
} from '../../ulils';
import defaultOrganization from './defaultOrganization';
import {Navigator} from '../../Navigator';

const prepareRequestBody = (page) => request.GET_HEADERS;

const parseResponse = async (r) => {
  if (r.status === 404) {
    Navigator.showPage('404');
    return null;
  }

  const j = await r.json();
  //@TODO получение списка резюме
  // try {
  //   const sumRes = await requestManager.tryGetSummaries()
  //   const sumRaw = await sumRes.json();
  //   const sum =
  //     sumRaw
  //         .filter(((s) => parseInt(s.author) === parseInt(getUserId())))
  //         .map((s) => ({
  //           firstName: s['first-name'],
  //           lastName: s['last-name'],
  //           phone: s['phone-number'],
  //           email: s.email,
  //           birthDate: s['birth-date'],
  //           sex: s['gender'],
  //           experience: s.experience,
  //           education: s.education,
  //           id: s.id,
  //         }));
  //
  //   return {
  //     user: {
  //       firstname: j.user['first-name'],
  //       lastname: j.user['last-name'],
  //       avatar: j.user.avatar,
  //     },
  //     summaries: sum,
  //   };
  // } catch (e) {
  //   return {
  //     user: {
  //       firstname: j.user['first-name'],
  //       lastname: j.user['last-name'],
  //       avatar: j.user.avatar,
  //     },
  //     summaries: [],
  //   };
  // }
};

const getUserId = () => {
  const name = location.pathname;

  if (name.startsWith('/organizations/')) {
    return name
        .replace( /\D+/g, '') ||
      currentSession.user.id || 1;
  }
  return currentSession.user.id || 1;
};

const prepareUrl = () => `/api/organizations/${getUserId()}`;

export const appendWithNetwork = (Wrappee) => withNetwork(
  prepareUrl, prepareRequestBody, Wrappee,
  'userData', defaultOrganization, parseResponse);
