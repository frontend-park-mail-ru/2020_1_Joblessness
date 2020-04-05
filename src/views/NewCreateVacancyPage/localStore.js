import {createLocalStore} from '../../ulils';
import {currentSession} from '../../ulils';
import {isCreationPage} from './isCreationPage';
import {getVacId} from './getVacId';

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
}, true, () => `vacancies/${isCreationPage ? 'create' : getVacId()}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
