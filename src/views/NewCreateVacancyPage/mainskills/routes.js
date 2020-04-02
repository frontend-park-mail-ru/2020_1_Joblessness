import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager'
import {Item} from './Item';

const MainSkillsRoutes = createEditor({
  Parent,
  Preview,
  Edit,
  AddItem,
  Item,
  ModeManager,
  withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    mainSkills: {
      ...s.mainSkills,
      preview: [...s.mainSkills.raw]
    }
  }),
  DECLINE_REDUCER: (s) => ({
    mainSkills: {
      ...s.mainSkills,
      raw: [...s.mainSkills.preview]
    }
  }),
  EXTRACT_REDUCER: (s) => {
    return s.mainSkills;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      mainSkills: {
        ...store,
        ...sub,
      },
    }
  },
  INSERT_REDUCER: (item) => (s) => ({
    mainSkills: {
      ...s.mainSkills,
      raw: [...s.mainSkills.raw, item]
    }
  }),
  ROOT: 'mainSkills/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_mainskills',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/create/*',
      childRoutes
    }
  ],
});


export default MainSkillsRoutes