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
    root: '.*/',
    reducerKey: uuid(),
    load: async (page = 0) => {
      try {
        const r = await requestManager.tryGetUserSummaries(getUserId(), page);
        const raw = await r.json();
        return raw.map(raw => ({
          author: raw.author,
          education: raw.educations?.map(e => {
            e.graduated = new Date(e.graduated).getFullYear();
            return e;
          }) || [],
          experience: raw.experiences.map(e => ({
            companyName: e.companyName,
            responsibilities: e.responsibilities,
            role: e.role,
            experienceFrom: new Date(e.start).getFullYear(),
            experienceTo: new Date(e.stop).getFullYear()
          })),
          id: raw.id,
          keywords: raw.keywords,
          name: raw.name,
          salaryFrom: raw.salaryFrom,
          salaryTo: raw.salaryTo
        }))
      } catch (e) {
        console.log(e)
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