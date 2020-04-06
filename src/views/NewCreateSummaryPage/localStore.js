import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  name: '',
  salaryFrom: '',
  salaryTo: '',
  experience: [],
  education: [],
  keywords: [],
}, true, () => `summaries/${getSumId() ?? 'create'}`, true);

export const getSumId = () => {
  const name = location.pathname;
  return name.replace(/\D+/g, '');
};
export default withLocalStore;
export {
  withLocalStore,
};
