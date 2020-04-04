import {createLocalStore} from '../../ulils';

const withLocalStore = createLocalStore({
  bar: {
    preview: {
      type: "",
      requestBody: "",
      since: 0,
      desc: true,
    },
    raw: {
      type: "",
      requestBody: "",
      since: 0,
      desc: true,
    },
  },
  search: {
    persons: [],
    organizations: [],
    vacancies: [],
  }
});

export {
  withLocalStore
}