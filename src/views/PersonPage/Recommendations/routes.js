import {Recommendations} from './RecommendationList';
import createLoadableList from '../../LoadableList';
import {Recommendation} from './Recommendation';
import withLocalStore from '../localStore';
import EmptyPage from '../../EmptyPage';
import {request, uuid} from '../../../ulils';

const createFullRoute = (childRoutes = []) => [
  {
    path: 'users/*',
    childRoutes,
  },
];
const Routes = createLoadableList({
    ListContainer: Recommendations,
    ListItem: Recommendation,
    LoadManager: EmptyPage,
  },
  {
    root: '/*recommendations',
    reducerKey: uuid(),
    load: async () => {
      const r = await request.get('/api/recommendation');
      try {
        const res = await r.json();
        for(let r of res) {
          if(r.responsibilities) {
            r.responsibilities = r.responsibilities.replace(/&#34;/g, '"')
            r.responsibilities = JSON.parse(r.responsibilities);
          }
          if(r.conditions) {
            r.conditions =  r.conditions.replace(/&#34;/g, '"');
            r.conditions = JSON.parse(r.conditions);
          }
        }
        return res
      } catch (e) {
        alert('Не удалось загрузить список рекомендаций');
        return null
      }
    },
    withLocalStore,
    extractFromStore: (s) => s.recommendations,
    insertIntoStore: recommendations => s => ({recommendations}),
    createRoute: (childRoutes = []) => childRoutes,
    createFullRoute,
    listSelector: '#users_current_section',
    LoadManagerSelector: '#recommendations_load_manager',
  }
);
export default Routes