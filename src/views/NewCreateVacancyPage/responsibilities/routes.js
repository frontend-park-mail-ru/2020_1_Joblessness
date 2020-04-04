import {createEditor} from '../../TextEditor';
import {withLocalStore} from '../localStore';

import {Parent} from './Parent';
import {Preview} from './Preview';
import {Edit} from './Edit';
import {AddItem} from './AddItem';
import {ModeManager} from './ModeManager';
import {Item} from './Item';

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
        ...store,
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
});


export default ResponsibilitiesRoutes;


//
// const MainInfoRoutes = createEditor({
//   Parent: OrganizationMainInfoPage,
//   Preview: PreviewInfo,
//   Edit: EditInfo,
//   AddItem: AddParagraph,
//   Item: ParagraphItem,
//   ModeManager: ModeManager,
//   withLocalStore: withLocalStore,
// }, {
//   SUBMIT_REDUCER: (s) => ({
//     responsibilities: {
//       ...s.responsibilities,
//       preview: [...s.responsibilities.raw]
//     }
//   }),
//   DECLINE_REDUCER: (s) => ({
//     responsibilities: {
//       ...s.responsibilities,
//       raw: [...s.responsibilities.preview]
//     }
//   }),
//   EXTRACT_REDUCER: (s) => {
//     return s.responsibilities;
//   },
//   REPLACE_REDUCER: (store, sub) => {
//     return {
//       responsibilities: {
//         ...store,
//         ...sub,
//       },
//     }
//   },
//   INSERT_REDUCER: (item) => (s) => ({
//     responsibilities: {
//       ...s.responsibilities,
//       raw: [...s.responsibilities.raw, item]
//     }
//   }),
//   ROOT: 'orgMainInfo/',
//   EDITOR_HOLDER_SELECTOR: '#organization_org_main_info',
//   ROOT_TEMPLATE: (childRoutes = []) => [
//     {
//       path: 'organizations/*',
//       childRoutes
//     }
//   ],
// });
