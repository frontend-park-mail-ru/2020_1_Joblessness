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
  mainInfo: {
    name: '',
    description: '',
    salaryFrom: 0,
    salaryTo: 0,
  },
  keywords: {
    preview: [],
    raw: [],
  },
}, true, () => `vacancies/${isCreationPage ? 'create' : getVacId()}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
