import {request, withNetwork} from '../../ulils';
import {Navigator} from '../../Navigator';

const getSummaryId = () => {
  const name = location.pathname;
  if (name.startsWith('/summaries/')) {
    return name.replace('/summaries/', '');
  }
  return 1;
};

const defaultSummary = {
  firstName: 'Имя',
  lastName: 'Фамиилия',
  phone: '89123456789',
  email: 'email@example.com',
  birthDate: '01/01/1900',
  sex: 'пол',
  experience: 'Опыт работы',
  education: 'Образование',
};

const prepareUrl = () =>
  `http://91.210.170.6:8000/api/summaries/${getSummaryId()}`;

const prepareRequestBody = () => request.GET_HEADERS;

export const appendNetwork = Wrappee => withNetwork(
  prepareUrl, prepareRequestBody, Wrappee,
  'summary', defaultSummary,
  async (r) => {
    if (r.status === 404) {
      Navigator.showPage('404');
    }
    try {
      const j = await r.json();

      return {
        firstName: j['first-name'],
        lastName: j['last-name'],
        phone: j['phone-number'],
        email: j.email,
        birthDate: j['birth-date'],
        sex: j['gender'],
        experience: j.experience,
        education: j.education,
      };

    } catch (e) {
      console.log(e);
      return {};
    }
  },
);