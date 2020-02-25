import {postRequest} from '../../ulils/postRequest';

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
  });
};
