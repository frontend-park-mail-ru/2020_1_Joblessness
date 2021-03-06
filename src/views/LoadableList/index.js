import construct from './construct';
import {loadManager} from './LoadManager/construct';
const createLoadableList = (
  {
    ListContainer,
    ListItem,
    LoadManager,
  },
  {
    withLocalStore,
    extractFromStore,
    insertIntoStore,
    pushIntoStore,
    createRoute,
    createFullRoute,
    listSelector,
    LoadManagerSelector,
    reducerKey,
    enablePagination,
    pagSize,
    root,
    load,
    alwaysOn
  }
) => {

  const props = {
    withLocalStore,
    extractFromStore,
    insertIntoStore,
    pushIntoStore,
    createRoute,
    createFullRoute,
    listSelector,
    load,
    LoadManagerSelector,
    enablePagination,
    pagSize,
    reducerKey,
    root,
    ListItem,
  };

  const listContainer = construct.list(ListContainer, props);
  const initListRoute = (childRoutes = []) => createRoute([
    {
      path: root,
      alwaysOn,
      element: listContainer,
      childRoutes
    }
  ]);
  props.listRoute = initListRoute;
  const loadManagerContainer = construct.loadManager(LoadManager, props);
  const initLoadManagerRoute = (childRoutes = []) => initListRoute([
    {
      path: 'loadManager',
      alwaysOn: true,
      element: loadManagerContainer,
      childRoutes,
    }
  ])
  props.loadManagerRoute = [
    {
      path: 'loadManager',
      alwaysOn: true,
      element: loadManagerContainer,
    }
  ];
  return initLoadManagerRoute();
}

export default createLoadableList;