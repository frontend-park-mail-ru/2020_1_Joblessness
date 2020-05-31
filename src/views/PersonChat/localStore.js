import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  messenger: {
    dialogs: [],
    messages: []
  }
}, false, () => `messages/${currentSession.user.id}`, false);
export default withLocalStore;

export {
  withLocalStore,
};
