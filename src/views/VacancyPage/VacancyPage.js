import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {withNetwork} from '../../ulils';

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

VacancyPage = withNetwork('/api/vacancy', () => ({}), VacancyPage,
    'vacancy', {
      name: 'Раб недорого',
      description: 'Описание самой лучшой вакансии на планете',
      skills: 'Норм работник',
      salary: '100-2000',
      address: 'Москва, Бауманская 23, к.1',
      phone: '89250499222',
    });

export {
  VacancyPage,
};
