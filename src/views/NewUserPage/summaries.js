import './style.sass'
import {Page} from '../../Page';
import template from './pug/sub/summaries.pug'
import {currentSession, request, withNetwork} from '../../ulils';

const getUserId = () => {
  const name = location.pathname;

  if (name.startsWith('/users/')) {
    return name
        .replace( /\D+/g, '') ||
      currentSession.user.id || 1;
  }
  return currentSession.user.id || 1;
};

const parseResponse = async (r) => {

  try {
    const sumRaw = await r.json();
    const sum =
      sumRaw
        .filter(((s) => parseInt(s.author) === parseInt(getUserId())))
        .map((s) => ({
          firstName: s['first-name'],
          lastName: s['last-name'],
          phone: s['phone-number'],
          email: s.email,
          birthDate: s['birth-date'],
          sex: s['gender'],
          experience: s.experience,
          education: s.education,
          id: s.id,
        }));

    return sum
  } catch (e) {
    return []
  }
};

class SummariesSubPage extends Page {

  render() {
    return template(this.props);
  }
}
SummariesSubPage = withNetwork(
  '/api/summaries', () =>request.GET_HEADERS, SummariesSubPage, 'summaries',
  [], parseResponse
);
export {SummariesSubPage};
