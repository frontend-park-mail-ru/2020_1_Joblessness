import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  name: '',
  salaryFrom: '',
  salaryTo: '',
  experience: {
    raw: [],
    preview: [],
  },
  education: {
    raw: [],
    preview: [],
  },
  keywords: {
    raw: '',
    preview: '',
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
