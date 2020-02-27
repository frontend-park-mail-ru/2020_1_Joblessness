import {currentSession, request} from '../../ulils';
import {Navigator} from '../../Navigator';

export const createSummary = (s) => {
  let education = s.higherEducation ?
    'Высшее образование: ' + s.higherEducation + '. ' :
    '';
  education += s.secondaryEducation ?
    'Среднее образование: '+ s.secondaryEducation + '.' :
    '';
  console.log(s);
  request.post(`/api/summaries`, {
    'author': (currentSession.user.id).toString(),
    'first-name': s.firstName,
    'last-name': s.lastName,
    'phone-number': s.phone,
    'email': s.email,
    'birth-date': `${s.birthDay}/${Number(s.birthMonth) + 1}/${s.birthYear}`,
    'gender': s.sex,
    'experience': s.experience,
    'education': education,
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
