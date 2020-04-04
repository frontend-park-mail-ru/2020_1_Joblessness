import {createLocalStore} from '../../ulils';
import {currentSession} from '../../ulils';

const withLocalStore = createLocalStore({
  organization: {
    avatar: '',
    id: 0,
    name: '',
    phone: '',
    location: '',
    tag: '',
  },
  responsibilities: {
    preview: [],
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
  // mainSkills: {
  //   preview: [],
  //   raw: [],
  // },
  keywords: {
    preview: [],
    raw: [],
  },
}, true, () => `vacancies/${currentSession.user.id}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
