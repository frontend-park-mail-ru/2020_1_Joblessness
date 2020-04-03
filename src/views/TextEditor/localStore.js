import {createLocalStore} from '../../ulils';

const createWithLocalStoreDefault = () => {
  console.log(123)
  return createLocalStore({
    preview: '',
    raw: [],
  });
}

export default createWithLocalStoreDefault;
export {
  createWithLocalStoreDefault,
};
