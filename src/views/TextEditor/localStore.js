import {createLocalStore} from '../../ulils';

const createWithLocalStoreDefault = () => {
  return createLocalStore({
    preview: '',
    raw: [],
  });
};

export default createWithLocalStoreDefault;
export {
  createWithLocalStoreDefault,
};
