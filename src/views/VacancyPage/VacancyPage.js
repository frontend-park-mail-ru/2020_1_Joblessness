import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {request, withNetwork} from '../../ulils';
import {Navigator} from '../../Navigator';

/**
 * смотри пояснения к резюме
 */
class VacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template({vacancy: this.props.vacancy});
  }
}
const getVacancyId = () => {
  const name = location.pathname;
  if (name.startsWith('/vacancies/')) {
    return name.replace('/vacancies/', '');
  }
  return 1;
};
VacancyPage = withNetwork(
    () => `http://91.210.170.6:8000/api/vacancies/${getVacancyId()}`,
    () => request.GET_HEADERS, VacancyPage,
    'vacancy', {
      name: 'Описание работы',
      description: 'Описание самой лучшой вакансии на планете',
      skills: 'Норм работник',
      salary: '100-2000',
      address: 'Москва, Бауманская 23, к.1',
      phone: '89250499222',
    },
    async (r) => {
      if (r.status === 404 ) {
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
    });

export {
  VacancyPage,
};
