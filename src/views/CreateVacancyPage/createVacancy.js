import {postRequest} from '../../ulils/postRequest';
import {Navigator} from '../../Navigator';

export const createVacancy = (v) => {
  postRequest('/api/vacancies', {
    'name': v.vacancyName,
    'description': v.description,
    'skills': v.mainSkills,
    'salary': `${v.expectedIncomeFrom}-${v.expectedIncomeTo}`,
    'address': v.officeAddress,
    'phone-number': v.phone,
  }).then(async (r) => {
    if ( r.status === 201 ) {
      try {
        const j = await r.json();
        Navigator.showPage(`vacancies/${j.id}`);
      } catch (e) {
        console.log(e);
        alert('Что-то пошло не так');
      }
    } else {
      alert('Что-то пошло не так');
    }
  }).catch(() => alert('Невозможно создать вакансию'));
};
