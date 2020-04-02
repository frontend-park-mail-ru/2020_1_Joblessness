import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager'
import {Item} from './Item';

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
      preview: [...s.conditions.raw]
    }
  }),
  DECLINE_REDUCER: (s) => ({
    conditions: {
      ...s.conditions,
      raw: [...s.conditions.preview]
    }
  }),
  EXTRACT_REDUCER: (s) => {
    return s.conditions;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      conditions: {
        ...store,
        ...sub,
      },
    }
  },
  INSERT_REDUCER: (item) => (s) => ({
    conditions: {
      ...s.conditions,
      raw: [...s.conditions.raw, item]
    }
  }),
  ROOT: 'conditions/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_conditions',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/create/*',
      childRoutes
    }
  ],
});


export default ConditionsRoutes