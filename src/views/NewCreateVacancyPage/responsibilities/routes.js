import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager} from '../../../ulils';
import {isCreationPage} from '../isCreationPage';
import {getVacId} from '../getVacId';

const ResponsibilitiesRoutes = createEditor({
  Parent,
  Preview,
  Edit,
  AddItem,
  Item,
  ModeManager,
  withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    responsibilities: {
      ...s.responsibilities,
      preview: [...s.responsibilities.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    responsibilities: {
      ...s.responsibilities,
      raw: [...s.responsibilities.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.responsibilities;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      responsibilities: {
        ...store.responsibilities,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    responsibilities: {
      ...s.responsibilities,
      raw: [...s.responsibilities.raw, item],
    },
  }),
  ROOT: 'responsibilities/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_responsibilities',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/*',
      childRoutes,
    },
  ],
  onApply: (props, page) => new Promise((resolve, reject) => {
    if (!isCreationPage()) {
      const responsibilities = page.props.getStore().responsibilities;
      responsibilities.preview = responsibilities.raw;
      requestManager.tryChangeVacancy({
        responsibilities: JSON.stringify(responsibilities),
      }, getVacId())
          .then(resolve)
          .catch(reject);
    } else {
      resolve();
    }
  }),
});


export default ResponsibilitiesRoutes;
