import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager, uuid} from '../../../ulils';
import {isCreationPage} from '../isCreationPage';
import {getVacId} from '../getVacId';

const ConditionsRoutes = createEditor({
  Parent,
  Preview,
  Edit,
  AddItem,
  Item,
  ModeManager,
  withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    conditions: {
      ...s.conditions,
      preview: [...s.conditions.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    conditions: {
      ...s.conditions,
      raw: [...s.conditions.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.conditions;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      conditions: {
        ...store.conditions,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    conditions: {
      ...s.conditions,
      raw: [...s.conditions.raw, item],
    },
  }),
  MAX_SIZE: 5,
  ROOT: 'conditions/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_conditions',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/*',
      childRoutes,
    },
  ],
  ON_ITEM_LIMIT : () => {
    alert('Не более 5 параграфов')
  },
  onApply: (props, page) => new Promise((resolve, reject) => {
    if (!isCreationPage()) {
      const conditions = page.props.getStore().conditions;
      conditions.preview = conditions.raw;
      requestManager.tryChangeVacancy({
        conditions: JSON.stringify(conditions.preview),
      }, getVacId())
          .then(resolve)
          .catch(reject);
    } else {
      resolve();
    }
  }),
});


export default ConditionsRoutes;
