import {Page} from '../../Page';
import template from './pug/index.pug';
import './style.sass';
import {uuid, withEvents, withNetwork} from '../../ulils';
import {request} from '../../ulils';

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
// preload data
VacancyListPage = withNetwork('http://91.210.170.6:8000/api/vacancies', prepareRequestBody,
    VacancyListPage, 'vacancies', [],
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
          ];
          b.requestRender();
        },
      },
    },
);

export {
  VacancyListPage,
};
