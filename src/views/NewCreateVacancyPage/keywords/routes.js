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

const RequirementsRoutes = createEditor({
  Parent,
  Preview,
  Edit,
  AddItem,
  Item,
  ModeManager,
  withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    keywords: {
      ...s.keywords,
      preview: [...s.keywords.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    keywords: {
      ...s.keywords,
      raw: [...s.keywords.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.keywords;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      keywords: {
        ...store.keywords,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    keywords: {
      ...s.keywords,
      raw: [...s.keywords.raw, item],
    },
  }),
  ROOT: 'keywords/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_keywords',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/*',
      childRoutes,
    },
  ],
  onApply: (props, page) => new Promise((resolve, reject) => {
    console.log(page.props.getStore())
    if(!isCreationPage()) {
      const keywords = page.props.getStore().keywords;
      keywords.preview = keywords.raw
      requestManager.tryChangeVacancy({
        keywords: JSON.stringify(keywords)
      }, getVacId())
        .then(resolve)
        .catch(reject)
    } else {
      resolve()
    }
  })
});


export default RequirementsRoutes;
