import {Summaries} from './SummariesList';
import createLoadableList from '../../LoadableList';
import {Summary} from './Summary';
import withLocalStore from '../localStore';
import EmptyPage from '../../EmptyPage';
import {requestManager} from '../../../ulils';
import {getUserId} from '../getUserId';

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
    reducerKey: 'summaries_update_reducer',//uuid(),
    load: async () => {
      try {
        const r = await requestManager.tryGetUserSummaries(getUserId(), 0);
        return await r.json()
      } catch (e) {
        alert('Не удалось загрузить список резюме');
        return null
      }
    },
    withLocalStore,
    extractFromStore: (s) => s.summaries,
    insertIntoStore: summaries => s => ({summaries}),
    createRoute: (childRoutes = []) => childRoutes,
    createFullRoute,
    listSelector: '#users_current_section',
    LoadManagerSelector: '#summaries_load_manager',
  }
);
export default Routes