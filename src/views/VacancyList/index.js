import {Page} from '../../Page';
import template from './pug/index.pug';
import './style.sass';
import {uuid, withEvents, withNetwork} from '../../ulils';
import {GET_HEADERS} from '../../ulils/postRequest';

/**
 * Vacancies
 */
class VacancyListPage extends Page {
  /**
   * @return {string}
   */
  render() {
    return template(this.props);
  }
}
const defaultVacancy = {
  name: 'Имя вакансии',
  description: 'Описание вакансии',
  skills: 'Требуемые навыки',
  salary: 'от-до',
  city: 'Город',
  address: 'Адрес офиса',
  email: 'email@company.com',
  phone_number: '89123456789',
  comment: 'Дополнительная информация',
};
const prepareRequestBody = () => GET_HEADERS;
const parseResponse = async (r) => {
  const vacancies = await r.json();
  return vacancies.map( (v) => ({
    name: v.name,
    description: v.description,
    skills: v.skills,
    salary: v.salary,
    address: v.address,
    phone: v['phone-number'],
  }));
};
// preload data
VacancyListPage = withNetwork('http://91.210.170.6:8000/api/vacancies', prepareRequestBody,
    VacancyListPage, 'vacancies', [defaultVacancy],
    parseResponse);

VacancyListPage = withEvents(VacancyListPage, 'events',
    {
      showMore: {
        id: uuid(),
        eventName: 'click',
        event: (a, b) => {
        // @TODO load more vacancies from server
          b.props.vacancies = [
            ...b.props.vacancies,
            defaultVacancy,
          ];
          b.requestRender();
        },
      },
    },
);

export {
  VacancyListPage,
};
