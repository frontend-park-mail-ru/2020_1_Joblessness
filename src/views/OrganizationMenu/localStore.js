import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  responses: [],
  currentPage: 'responses',
  messenger: {
    messages: [
    ]
  }
}, true, () => `responses/${currentSession.user.id}`, true);
export default withLocalStore;

export {
  withLocalStore,
};
