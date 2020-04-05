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
      preview: [...s.mainSkills.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    mainSkills: {
      ...s.mainSkills,
      raw: [...s.mainSkills.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.mainSkills;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      mainSkills: {
        ...store.mainSkills,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    mainSkills: {
      ...s.mainSkills,
      raw: [...s.mainSkills.raw, item],
    },
  }),
  ROOT: 'mainSkills/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_mainskills',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/*',
      childRoutes,
    },
  ],
  onApply: (props, page) => new Promise((resolve, reject) => {
    if(!isCreationPage()) {
      const mainSkills = page.props.getStore().mainSkills;
      mainSkills.preview = mainSkills.raw;
      requestManager.tryChangeVacancy({
        mainSkills: JSON.stringify(mainSkills)
      }, getVacId())
        .then(resolve)
        .catch(reject)
    } else {
      resolve()
    }
  })
});


export default MainSkillsRoutes;
