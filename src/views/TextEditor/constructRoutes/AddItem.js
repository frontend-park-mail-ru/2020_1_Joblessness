import {Navigator} from '../../../Navigator';

export const addItem = (AddItem, props) => (childRoutes = []) => [
  {
    path: 'addParagraph',
    alwaysOn: true,
    useInner: true,
    element: AddItem,
    next: '',
    innerNext: 'editMode',
    innerPath: 'addParagraph',
    beforeNext: (page, info) => {
      if (!page.props.info) {
        page.props.info = [];
      }

      page.props.info.push(info);

      Navigator.updateAllPages();
    },
    childRoutes,
  }
];