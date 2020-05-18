import {Summaries} from './SummariesList';
import createLoadableList from '../../LoadableList';
import {Summary} from './Summary';
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
    ListContainer: Summaries,
    ListItem: Summary,
    LoadManager: EmptyPage,
  },
  {
    root: '/*summaries',
    reducerKey: uuid(),
    load: async (page = 0) => {
      try {
        const r = await requestManager.tryGetUserSummaries(getUserId(), page);
        return await r.json()
      } catch (e) {
        alert('Не удалось загрузить список резюме');
        return null
      }
    },
    // enablePagination: true,
    pagSize: 10,
    withLocalStore,
    extractFromStore: (s) => s.summaries,
    insertIntoStore: summaries => s => ({summaries}),
    pushIntoStore: summaries => s => ({summaries: [...s.summaries, ...summaries]}),
    createRoute: (childRoutes = []) => childRoutes,
    createFullRoute,
    listSelector: '#users_current_section',
    LoadManagerSelector: '#summaries_load_manager',
  }
);
export default Routes