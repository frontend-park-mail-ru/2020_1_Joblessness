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
        const res = await r.json()
        return res.map(i => {
          if(!('surname' in i ))
            return i;
          i.firstName = i.name;
          i.lastName = i.surname;
          return i;
        })
        // return JSON.parse('[{"id":33,"tag":"restaurant","avatar":"https://hb.bizmrg.com/imgs-hh/default-avatar.png","isPerson":false,"name":"Ресторан","surname":""},{"id":40,"tag":"zavod.","avatar":"https://hb.bizmrg.com/imgs-hh/default-avatar.png","isPerson":false,"name":"Завод","surname":""},{"id":36,"tag":"AleshaPupin","avatar":"https://hb.bizmrg.com/imgs-hh/36-avatar.jpg","isPerson":true,"name":"Алексей","surname":"Пупин"}]')
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