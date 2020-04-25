import '@babel/polyfill';
import './style.sass';
import {Navigator} from './Navigator.js';
import {loginOnReload} from './ulils/loginOnReload';
import {Header, NotFoundPage} from './views';
import ORGANIZATIONS_ROUTES from './views/OrganizationPage/routes';
import CREATE_VACANCY_ROUTES from './views/VacancyPage/routes';
import CREATE_SUMMARY_ROUTES from './views/SummaryPage/routes';
import USER_ROUTES from './views/PersonPage/routes';
import AUTHENTICATION_ROUTES from './views/Authentication/routes';
import SEARCH_ROUTES from './views/SearchPage/routes';
import ORGANIZATION_MENU_ROUTES from './views/OrganizationMenu/routes';
import {RootElement} from './RootElement';
import './styles/index.sass';

/**
 * Init function
 */
function init() {
  console.log('In init');
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', registerServiceWorker);
  }
}

/**
 * Register service-worker
 */
function registerServiceWorker() {
  navigator.serviceWorker.register('src/service-worker.js')
      .then((registration) => {
        if (!registration.active) {
          // Is not active
        }
        console.log('Service worker is active');
      });
}

/**
 * App
 */
class App {
  /**
   * Init everything
   */
  constructor() {
    console.log('Application was created');

    const routes = [
      {
        path: 'root',
        alwaysOn: true,
        element: new RootElement('#holder'),
        childRoutes: [
          {
            path: 'header',
            alwaysOn: true,
            element: new Header('#nav-elements'),
          },
        ],
      },
      ...ORGANIZATION_MENU_ROUTES,
      ...SEARCH_ROUTES,
      ...AUTHENTICATION_ROUTES,
      ...USER_ROUTES,
      ...ORGANIZATIONS_ROUTES,
      ...CREATE_SUMMARY_ROUTES,
      ...CREATE_VACANCY_ROUTES,
      {
        path: '404',
        element: new NotFoundPage('#root'),
      },
    ];
    Navigator.addRoutes(routes);

    const loc = window.location.pathname.replace('/', '');
    Navigator.showPage(loc, true, true);
  }
}
const createApp = async () => {
  await loginOnReload();
  // currentSession.session = {id: 7, role : 'ORGANIZATION'};
  // currentSession.session = {id: 2, role: 'PERSON'}
  new App();
};
createApp();
init();
