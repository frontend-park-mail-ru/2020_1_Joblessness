import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {withNetwork} from '../../ulils';
import {GET_HEADERS} from '../../ulils/postRequest';
import {Navigator} from '../../Navigator';

/**
 * summary page
 */
class SummaryPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props);
  }
}

const getSummaryId = () => {
  const name = location.pathname;
  if (name.startsWith('/summaries/')) {
    return name.replace('/summaries/', '');
  }
  return 1;
};
SummaryPage = withNetwork(
    () => `http://91.210.170.6:8000/api/summaries/${getSummaryId()}`,
    () => GET_HEADERS, SummaryPage,
    'summary', {
      firstName: 'Имя',
      lastName: 'Фамиилия',
      phone: '89123456789',
      email: 'email@example.com',
      birthDate: '01/01/1900',
      sex: 'пол',
      experience: 'Опыт работы',
      education: 'Образование',
    },
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

export {
  SummaryPage,
};
