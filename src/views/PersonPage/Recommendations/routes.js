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
      try {
        const r = await request.get('/api/recommendation');
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
        console.log(res);
        return res
        // return [
        //   {
        //     conditions: [
        //       {
        //         classList: ["paragraph"],
        //         id: "_hekcvpurx",
        //         text: "Хуже среднего",
        //       }
        //     ],
        //     description: "Инженерить круглые сутки",
        //     id: 22,
        //     name: "Инженер",
        //     organization: {
        //       avatar: "https://hb.bizmrg.com/imgs-hh/34-avatar.jpg",
        //       id: 34,
        //       name: "КБ Инженер",
        //       site: "inga.ru",
        //       tag: "ingeneer",
        //     },
        //     responsibilities: [
        //       {
        //         classList: ["paragraph"],
        //         id: "_z7rdjmsqb",
        //         text: "Дома сказать, что пойдешь на работу."
        //       },
        //       {
        //         classList: ["paragraph"],
        //         id: "_u9iihxqbc",
        //         text: "На работе сказать, что останешься дома."
        //       },
        //       {
        //         classList: ["paragraph"],
        //         id: "_ghxg97grs",
        //         text: "А сам запрешься в туалете и чертить, чертить, чертить",
        //       },
        //     ],
        //     salaryFrom: 100,
        //     salaryTo: 150,
        //     withTax: false
        //   },
        //   {
        //     conditions: [
        //       {
        //         classList: ["paragraph"],
        //         id: "_hekcvpurx",
        //         text: "Хуже среднего",
        //       },
        //       {
        //         classList: ["paragraph"],
        //         id: "_hekcvpurx",
        //         text: "Есть печенья",
        //       }
        //     ],
        //     description: "Инженерить круглые сутки",
        //     id: 22,
        //     name: "Инженер",
        //     organization: {
        //       avatar: "https://hb.bizmrg.com/imgs-hh/34-avatar.jpg",
        //       id: 34,
        //       name: "КБ Инженер",
        //       site: "inga.ru",
        //       tag: "ingeneer",
        //     },
        //     responsibilities: [
        //       {
        //         classList: ["paragraph"],
        //         id: "_z7rdjmsqb",
        //         text: "Дома сказать, что пойдешь на работу."
        //       },
        //       {
        //         classList: ["paragraph"],
        //         id: "_u9iihxqbc",
        //         text: "На работе сказать, что останешься дома."
        //       },
        //       {
        //         classList: ["paragraph"],
        //         id: "_ghxg97grs",
        //         text: "А сам запрешься в туалете и чертить, чертить, чертить",
        //       },
        //     ],
        //     salaryFrom: 100,
        //     salaryTo: 150,
        //     withTax: false
        //   }
        // ];
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