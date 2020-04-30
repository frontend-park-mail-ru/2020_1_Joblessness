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
import ORGANIZATION_MENU_ROUTES from './views/OrganizationMenu/routes';
import ROOT_ROUTES from './views/RootElement'
import ALERTS_ROUTES from './views/Alerts'
import METRICS_ROUTES from './views/Metrics'
import './styles/index.sass'
import './views/legacy-sum.sass'
import ws from './ws'
import {request} from './ulils';


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
 * Register service-worker
 */
const registerServiceWorker = () => {
  navigator.serviceWorker.register('src/service-worker.js')
    .then((registration) => {
      if (!registration.active) {
        // Is not active
      }
      console.log('Service worker is active');
    });
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
      ...ALERTS_ROUTES,
      ...ORGANIZATION_MENU_ROUTES,
      ...SEARCH_ROUTES,
      ...AUTHENTICATION_ROUTES,
      ...USER_ROUTES,
      ...METRICS_ROUTES,
      ...ORGANIZATIONS_ROUTES,
      ...CREATE_SUMMARY_ROUTES,
      ...CREATE_VACANCY_ROUTES,
      {
        path: '404',
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
  ws();
  // currentSession.session = {id: 7, role : 'ORGANIZATION'};
  // currentSession.session = {id: 2, role: 'PERSON'};
  new App();
};

createApp();
