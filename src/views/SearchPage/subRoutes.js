import {Bar} from './Bar';
import {Display} from './Display';
import {uuid} from '../../ulils';
import {Navigator} from '../../Navigator';
import {SearchPage} from './index';
import Item from './Item';


const constructSubRoutes = (childRoutes = []) => [
  {
    path: '^$|^/$|search',
    childRoutes,
  },
  {
    path: 'search/vacancies',
    childRoutes,
  },
  {
    path: 'search/users',
    childRoutes,
  },
  {
    path: 'search/organizations',
    childRoutes,
  },
];

const DisplayPage = new Display('#search_display');
const constructDisplaySubRoutes = (childRoutes = []) => constructSubRoutes(
    [
      {
        path: 'display',
        alwaysOn: true,
        innerPath: 'display',
        element: DisplayPage,
        childRoutes,
      },
    ],
);
const SubRoutes = [
  {
    path: 'bar',
    alwaysOn: true,
    useInner: true,
    innerNext: 'display',
    innerPath: 'bar',
    element: new Bar('#search_bar'),
    beforeNext: (page) => {
      const {persons, organizations, vacancies} = page.props.getStore().search;
      Navigator.removeRoutes(constructDisplaySubRoutes());
      Navigator.addRoutes(constructDisplaySubRoutes());
      for (const p of persons) {
        if (!p.element) {
          const childItem = new Item(`#${p.innerId}`);
          p.element = childItem;
          childItem.props.type = 'person';
          childItem.props.item = p;
        }
        Navigator.addRoutes(constructDisplaySubRoutes([{
          path: p.innerId,
          alwaysOn: true,
          element: p.element,
        }]));
      }

      for (const p of vacancies) {
        if (!p.element) {
          const childItem = new Item(`#${p.innerId}`);
          p.element = childItem;
          childItem.props.type = 'vacancy';
          childItem.props.item = p;
        }
        Navigator.addRoutes(constructDisplaySubRoutes([{
          path: p.innerId,
          alwaysOn: true,
          element: p.element,
        }]));
      }

      for (const p of organizations) {
        if (!p.element) {
          const childItem = new Item(`#${p.innerId}`);
          p.element = childItem;
          childItem.props.type = 'organization';
          childItem.props.item = p;
        }
        Navigator.addRoutes(constructDisplaySubRoutes([{
          path: p.innerId,
          alwaysOn: true,
          element: p.element,
        }]));
      }
      Navigator.updateAllPages();
    },
  },
  {
    path: 'display',
    alwaysOn: true,
    innerPath: 'display',
    element: new Display('#search_display'),
  },
];


export default SubRoutes;
