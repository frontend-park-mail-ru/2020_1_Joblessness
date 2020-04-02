import {createLocalStore} from '../../ulils';
import {currentSession} from '../../ulils';

const withLocalStore = createLocalStore({
  responsibilities: {
    preview : [],
    raw: [],
  },
  requirements: {
    preview: [],
    raw: [],
  },
  conditions: {
    preview: [],
    raw: [],
  },
  mainSkills: {
    preview: [],
    raw: [],
  },
  keywords: {
    preview: [],
    raw: [],
  }
}, true, () => `vacancies/${currentSession.user.userId || 0}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
