import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  experience: [],
  education: [],
  keywords: '',
}, true, () => `summaries/${getSumId()}`, true);

export const getSumId = () => {
  const name = location.pathname;
  return name.replace(/\D+/g, '');
};
export default withLocalStore;
export {
  withLocalStore,
};
