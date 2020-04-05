import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';
import {requestManager} from '../../../ulils';

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
    requirements: {
      ...s.requirements,
      preview: [...s.requirements.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    requirements: {
      ...s.requirements,
      raw: [...s.requirements.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.requirements;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      requirements: {
        ...store,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    requirements: {
      ...s.requirements,
      raw: [...s.requirements.raw, item],
    },
  }),
  ROOT: 'requirements/',
  EDITOR_HOLDER_SELECTOR: '#vacancy_requirements',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'vacancies/*',
      childRoutes,
    },
  ],
  onApply: (props, page) => new Promise((resolve, reject) => {
    if(isCreationPage()) {
      const responsibilities = page.props.getStore().responsibilities;
      requestManager.tryChangeOrg({
        responsibilities: JSON.stringify(responsibilities)
      })
        .then(resolve)
        .catch(reject)
    }
  })
});


export default RequirementsRoutes;
