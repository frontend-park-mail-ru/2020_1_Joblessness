import {constructSubRoutes as constructParentRoutes,
        RootPath as parentRootPath} from '../subRoutes';
import {AddParagraph} from './AddParagraph';
import {Navigator} from '../../../../Navigator';

const RootPath = 'editMode/';
const FullRoot = parentRootPath + RootPath;
const SubRoutes = [
  {
    path: 'addParagraph',
    alwaysOn: true,
    useInner: true,
    element: new AddParagraph('#organizations_main_info_edit_mode_add_paragraph'),
    next: '',
    innerNext: 'editMode',
    innerPath: 'addParagraph',
    beforeNext: (rootPage, info) => {
      if(!rootPage.props.info)
        rootPage.props.info = [];

      rootPage.props.info.push(info);

      Navigator.updateAllPages()
    }
  }
];

const constructSubRoutes = (subRoutes) => constructParentRoutes(
  [
    {
      path: RootPath,
      childRoutes: [
        ...subRoutes,
      ],
    },
  ]
);


export {
  SubRoutes,
  FullRoot,
  RootPath,
  constructSubRoutes,
};