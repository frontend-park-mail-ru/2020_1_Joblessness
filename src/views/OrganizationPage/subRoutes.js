import {OrganizationInfo} from './OrganizationInfo';
import LoadManagerRoutes from './OrganizationVacancies/loadManager';
import {createEditor} from '../TextEditor';
import VacanciesRoutes from './OrganizationVacancies/routes';
import {OrganizationMainInfoPage} from './newMainInfo/MainInfo';
import {PreviewInfo} from './newMainInfo/PreviewInfo';
import {EditInfo} from './newMainInfo/EditInfo';
import {ModeManager} from './newMainInfo/ModeManager';
import {AddParagraph} from './newMainInfo/AddParagraph';
import {ParagraphItem} from './newMainInfo/ParagraphItem';
import withLocalStore from './localStore';

const RootPath = 'organizations/';

const MainInfoRoutes = createEditor({
  Parent: OrganizationMainInfoPage,
  Preview: PreviewInfo,
  Edit: EditInfo,
  AddItem: AddParagraph,
  Item: ParagraphItem,
  ModeManager: ModeManager,
  withLocalStore: withLocalStore,
}, {
  SUBMIT_REDUCER: (s) => ({
    mainInfo: {
      ...s.mainInfo,
      preview: [...s.mainInfo.raw],
    },
  }),
  DECLINE_REDUCER: (s) => ({
    mainInfo: {
      ...s.mainInfo,
      raw: [...s.mainInfo.preview],
    },
  }),
  EXTRACT_REDUCER: (s) => {
    return s.mainInfo;
  },
  REPLACE_REDUCER: (store, sub) => {
    return {
      mainInfo: {
        ...store,
        ...sub,
      },
    };
  },
  INSERT_REDUCER: (item) => (s) => ({
    mainInfo: {
      ...s.mainInfo,
      raw: [...s.mainInfo.raw, item],
    },
  }),
  ROOT: 'orgMainInfo/',
  EDITOR_HOLDER_SELECTOR: '#organization_org_main_info',
  ROOT_TEMPLATE: (childRoutes = []) => [
    {
      path: 'organizations/*',
      childRoutes,
    },
  ],
});

const SubRoutes = [
  {
    path: 'orgInfo',
    alwaysOn: true,
    element: new OrganizationInfo('#organization_org_info'),
  },
  ...MainInfoRoutes,
  ...VacanciesRoutes,
  ...LoadManagerRoutes,
];

const constructSubRoutes = (subRoutes) => [
  {
    path: RootPath + '*',
    childRoutes: [
      ...subRoutes,
    ],
  },
];


export {
  SubRoutes,
  RootPath,
  constructSubRoutes,
};
