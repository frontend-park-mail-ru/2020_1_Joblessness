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
import './styles/index.sass'

import ws from './ws'
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
  await loginOnReload();
  ws();
  // currentSession.session = {id: 7, role : 'ORGANIZATION'};
  // currentSession.session = {id: 8, role: 'PERSON'};
  new App();
};

createApp();
