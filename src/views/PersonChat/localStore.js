import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  messenger: {
    dialogs: [],
    messages: []
  }
}, true, () => `messages/${currentSession.user.id}`, true);
export default withLocalStore;

export {
  withLocalStore,
};
