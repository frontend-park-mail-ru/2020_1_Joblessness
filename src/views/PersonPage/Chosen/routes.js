import {ChosenList} from './ChosenList';
import createLoadableList from '../../LoadableList';
import {Chosen} from './Chosen';
import withLocalStore from '../localStore';
import EmptyPage from '../../EmptyPage';
import {requestManager} from '../../../ulils';
import {getUserId} from '../getUserId';
import {uuid} from '../../../ulils';

const createFullRoute = (childRoutes = []) => [
  {
    path: 'users/*',
    childRoutes,
  },
];

const Routes = createLoadableList({
    ListContainer: ChosenList,
    ListItem: Chosen,
    LoadManager: EmptyPage,
  },
  {
    root: '/*favourites',
    reducerKey: uuid(),
    load: async (page = 0) => {
      try {
        const r = await requestManager.tryGetUserFavorites(getUserId(), page);
        return await r.json()
      } catch (e) {
        alert('Не удалось загрузить избранное');
        return null
      }
    },
    // enablePagination: true,
    pagSize: 10,
    withLocalStore,
    extractFromStore: (s) => s.chosen,
    insertIntoStore: chosen => s => ({chosen}),
    pushIntoStore: chosen => s => ({chosen: [...s.chosen, ...chosen]}),
    createRoute: (childRoutes = []) => childRoutes,
    createFullRoute,
    listSelector: '#users_current_section',
    LoadManagerSelector: '#chosen_load_manager',
  }
);
export default Routes