import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  user: {
  },
  mainInfo: {
    raw: {
      name: '',
      description: '',
      salaryFrom: '',
      salaryTo: '',
    },
    preview: {
      name: '',
      description: '',
      salaryFrom: '',
      salaryTo: '',
    },
  },
  experience: {
    preview: [],
    raw: [],
  },
  education: {
    preview: [],
    raw: [],
  },
  keywords: {
    preview: [],
    raw: [],
  },
}, true, () => `summaries/${getSumId() ?? 'create'}`, true);

export const getSumId = () => {
  const name = location.pathname;
  return name.replace(/\D+/g, '');
};
export default withLocalStore;
export {
  withLocalStore,
};
