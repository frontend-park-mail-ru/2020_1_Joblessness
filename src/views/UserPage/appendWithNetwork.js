// preload data
import {currentSession, request, withNetwork} from '../../ulils';
import defaultUser from './userDefault';
import {Navigator} from '../../Navigator';

const prepareRequestBody = (page) => request.GET_HEADERS;

const parseResponse = async (r) => {
  if (r.status === 404) {
    Navigator.showPage('404');
    return null;
  }

  const j = await r.json();

  try {
    const sumRes = await request.get(
        `/api/summaries`);
    const sumRaw = await sumRes.json();
    const sum =
      sumRaw
          .filter(((s) => s.author === parseInt(getUserId()))
              .map((s) => ({
                firstName: s['first-name'],
                lastName: s['last-name'],
                phone: s['phone-number'],
                email: s.email,
                birthDate: s['birth-date'],
                sex: s['gender'],
                experience: s.experience,
                education: s.education,
                id: s.id,
              })));

    return {
      user: {
        firstname: j.user['first-name'],
        lastname: j.user['last-name'],
        avatar: j.user.avatar,
      },
      summaries: sum,
    };
  } catch (e) {
    return {
      user: {
        firstname: j.user['first-name'],
        lastname: j.user['last-name'],
        avatar: j.user.avatar,
      },
      summaries: [],
    };
  }
};

const getUserId = () => {
  const name = location.pathname;
  if (name.startsWith('/users/')) {
    return name
        .replace('/users/', '')
        .replace('/', '') ||
      currentSession.user.id || 1;
  }
  return currentSession.user.id || 1;
};

const prepareUrl = () => `http://91.210.170.6:8000/api/user/${getUserId()}`;

export const appendWithNetwork = (Wrappee) => withNetwork(
    prepareUrl, prepareRequestBody, Wrappee,
    'userData', defaultUser, parseResponse);
