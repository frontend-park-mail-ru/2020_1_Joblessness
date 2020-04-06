import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  responses: []
}, true, () => `responses/${currentSession.user.id}`, true);
export default withLocalStore;

export {
  withLocalStore,
};
