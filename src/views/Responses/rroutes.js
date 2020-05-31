import createLoadableList from '../LoadableList';
import {Display} from './Display';
import {Item} from './Item';
import EmptyPage from '../EmptyPage';
import {request, requestManager, uuid} from '../../ulils';
import withLocalStore from './localStore';
import {LoadManager} from './LoadManager';

const createFullRoute = (childRoutes = []) => [
  {
    path: 'responses',
    childRoutes,
  },
];
const Routes = createLoadableList({
    ListContainer: Display,
    ListItem: Item,
    LoadManager: LoadManager,
  },
  {
    root: '',
    reducerKey: uuid(),
    load: async () => {
      try {
        const r = await requestManager.tryGetOrgResponses(currentSession.user.id);
        const list = await r.json();
        return list;
      } catch(e) {
        alert('Невозможно загрузить список откликов');
        console.log(r)
      }
    },
    withLocalStore,
    extractFromStore: (s) => s.responses,
    insertIntoStore: responses => s => ({responses}),
    createRoute: (childRoutes = []) => childRoutes,
    createFullRoute,
    listSelector: '#responses_display',
    LoadManagerSelector: '#responses_load_manager',
  }
);
export default Routes