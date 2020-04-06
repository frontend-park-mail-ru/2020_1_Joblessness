import {createLocalStore} from '../../ulils';
import {getOrgId} from './getOrgInfo';

const withLocalStore = createLocalStore({
  organization: {
    avatar: '',
    id: 0,
    name: '',
    phone: '',
    location: '',
    tag: '',
  },
  mainInfo: {
    preview: [],
    raw: [],
  },
}, true, () => `organizations/${getOrgId()}`, true);

export default withLocalStore;
export {
  withLocalStore,
};
