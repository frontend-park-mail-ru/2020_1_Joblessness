import {request, withNetwork} from '../../ulils';
import {Navigator} from '../../Navigator';

const getVacancyId = () => {
  const name = location.pathname;
  if (name.startsWith('/vacancies/')) {
    return name.replace('/vacancies/', '');
  }
  return 0;
};

const defaultVacancy = {
  name: 'Название вакансии',
  description: 'Описание вакансии',
  skills: 'Навыки работника',
  salary: '0-999999',
  address: 'Адрес',
  phone: '89123456789',
};

const prepareUrl = () =>
  `http://91.210.170.6:8000/api/vacancies/${getVacancyId()}`;

const prepareRequestBody = () => request.GET_HEADERS;

export const appendNetwork = (Wrappee) => withNetwork(
    prepareUrl, prepareRequestBody, Wrappee,
    'vacancy', defaultVacancy,
    async (r) => {
      if (r.status === 404) {
        Navigator.showPage('404');
      }
      try {
        const j = await r.json();
        console.log(j);
        return {
          name: j.name,
          description: j.description,
          skills: j.skills,
          salary: j.salary,
          address: j.address,
          phone: j['phone-number'],
        };
      } catch (e) {
        console.log(e);
        return {};
      }
    },
);
