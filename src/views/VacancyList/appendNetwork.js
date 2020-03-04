import {request, withNetwork} from '../../ulils';

const prepareRequestBody = () => request.GET_HEADERS;

const parseResponse = async (r) => {
  try {
    const vacancies = await r.json();

    return vacancies.map((v) => ({
      name: v.name,
      description: v.description,
      skills: v.skills,
      salary: v.salary,
      address: v.address,
      phone: v['phone-number'],
      id: v.id,
    }));
  } catch (e) {
    console.log(e);
    alert('Ошибка при обращении к списку доступных вакансий');
    return [];
  }
};

export const appendNetwork = (Wrappee) =>
  withNetwork('/api/vacancies', prepareRequestBody,
      Wrappee, 'vacancies', [],
      parseResponse);
