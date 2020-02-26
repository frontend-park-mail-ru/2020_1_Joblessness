import {postRequest} from '../../ulils/postRequest';
import {Navigator} from '../../Navigator';

export const createSummary = (s) => {
  postRequest(`/api/summaries`, {
    'first-name': s.firstName,
    'last-name': s.lastName,
    'phone-number': s.phone,
    'email': s.email,
    'birth-date': `${s.birthDay}/${s.birthMonth}/${s.birthYear}`,
    'gender': s.sex,
    'experience': s.experience,
    'education': s.education,
    'author': window.userId || 0,
  }).then(async (r) => {
    if ( r.status === 201 ) {
      try {
        const j = await r.json();
        Navigator.showPage(`summaries/${j.id}`);
      } catch (e) {
        console.log(e);
        alert('Что-то пошло не так');
      }
    } else {
      alert('Что-то пошло не так');
    }
  }).catch(() => alert('Невозможно создать резюме'));
};
