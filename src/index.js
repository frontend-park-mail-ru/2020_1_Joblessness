import '@babel/polyfill';
import './style.sass';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {NotFoundPage} from './views/NotFoundPage';
import ORGANIZATIONS_ROUTES from './views/OrganizationPage/routes';
import CREATE_VACANCY_ROUTES from './views/VacancyPage/routes';
import CREATE_SUMMARY_ROUTES from './views/SummaryPage/routes';
import USER_ROUTES from './views/PersonPage/routes';
import AUTHENTICATION_ROUTES from './views/Authentication/routes';
import SEARCH_ROUTES from './views/SearchPage/routes';
import RESPONSES_ROUTES from './views/Responses/routes'
import ROOT_ROUTES from './views/RootElement';
import ALERTS_ROUTES from './views/Alerts';
import METRICS_ROUTES from './views/Metrics';
import USER_CHAT_ROUTES from './views/PersonChat/routes'
import './styles/index.sass';
import './views/legacy-sum.sass';
import ws from './ws';

window.onload = function () {
  if(window.innerWidth < 350) {
    const v = document.getElementById('viewport-width');
    v.setAttribute('content','width=500');
  }
}

/**
 * Init
 */
const init = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((registration) => {
        console.log('Service worker registered: ', registration);
      }).catch((registrationError) => {
        console.log('Service worker not registered', registrationError);
      });
    });
  }
};

/**
 * App
 */
class App {
  /**
   * Init everything
   */
  constructor() {
    const routes = [
      ...ROOT_ROUTES,
      ...USER_CHAT_ROUTES,
      ...ALERTS_ROUTES,
      ...RESPONSES_ROUTES,
      ...SEARCH_ROUTES,
      ...AUTHENTICATION_ROUTES,
      ...USER_ROUTES,
      ...METRICS_ROUTES,
      ...ORGANIZATIONS_ROUTES,
      ...CREATE_SUMMARY_ROUTES,
      ...CREATE_VACANCY_ROUTES,
      {
        path: '.*',
        element: new NotFoundPage('#root'),
      },
    ];
    Navigator.addRoutes(routes);
    Navigator.updateAllPages();
  }
}
const createApp = async () => {
  init();
  await loginOnReload();
  // currentSession.session = {id: 47, role : 'ORGANIZATION'};
  // currentSession.session = {id: 13, role: 'PERSON'};
  new App();
};

createApp();