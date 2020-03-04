import './style.sass';
import {
  withChainedPages,
  withEvents,
  uuid,
  currentSession,
} from '../../ulils';
import template from './pug/index.pug';
import {Page} from '../../Page';
import {appendWithNetwork} from './appendWithNetwork';
import {SettingsSubPage} from './settings';
import {SummariesSubPage} from './summaries';
import {FavouriteSubPage} from './favourite';
import {StatisticsSubPage} from './statistics';
import {Navigator} from '../../Navigator';
import {changeAvatar} from './changeAvatar';

const CONTAINER = '#__user-sections';
const UserSubRoutes = [
  {
    path: 'settings',
    next: '/settings',
    element: new SettingsSubPage(CONTAINER),
  },
  {
    path: 'summaries',
    next: '/summaries',
    element: new SummariesSubPage(CONTAINER),
  },
  {
    path: '/favourite',
    next: '/favourite',
    element: new FavouriteSubPage(CONTAINER),
  },
  {
    path: '/',
    next: '/',
    element: new StatisticsSubPage(CONTAINER),
  },
];

/**
 * User Page component
 * Has subpages
 * settings
 * summaries
 * statistics
 * favourite
 */
class UserPage extends Page {
  /**
   * returns container for subpages
   * @return{string}
   */
  render() {
    return template(this.props);
  }

  /**
   * select desired link on reload
   */
  componentDidMount() {
    updateLinks();
  }
}

UserPage = appendWithNetwork(UserPage);
const settingsId = uuid();
const summariesId = uuid();
const favouritesId = uuid();
const statisticsId = uuid();


const showSubPage = (name) => {
  const path = window.location.pathname.replace(/\D+$/g, '');
  if (!path) {
    if (window.location.pathname.endsWith('users/')) {
      Navigator.showPage(
          window.location.pathname + currentSession.user.id + `/${name}`);
    } else {
      Navigator.showPage(
          window.location.pathname + '/' + currentSession.user.id + `/${name}`);
    }
  } else {
    Navigator.showPage(path + `/${name}`);
  }
};
UserPage = withEvents(UserPage, 'events',
    {
      showSettings: {
        id: settingsId,
        eventName: 'click',
        event: (e, page, id) => {
          showSubPage('settings');
        },
      },
      showSummaries: {
        id: summariesId,
        eventName: 'click',
        event: (e, page, id) => {
          showSubPage('summaries');
        },
      },
      showFavourite: {
        id: favouritesId,
        eventName: 'click',
        event: (e, page, id) => {
          showSubPage('favourites');
        },
      },
      showStatistics: {
        id: statisticsId,
        eventName: 'click',
        event: (e, page, id) => {
          showSubPage('');
        },
      },
      changeAvatar: {
        id: uuid(),
        eventName: 'change',
        event: changeAvatar,
      },
    },
);

const updateLinks = () => {
  const section = window.location.pathname.split('/');
  const list = document.querySelectorAll('.selected');
  for (const l of list) {
    l.classList.remove('selected');
  }
  switch (section[section.length - 1]) {
    case '':
      document.getElementById(statisticsId)?.classList.add('selected');
      break;
    case 'settings':
      document.getElementById(settingsId)?.classList.add('selected');
      break;
    case 'summaries':
      document.getElementById(summariesId)?.classList.add('selected');
      break;
    case 'favourites':
      document.getElementById(favouritesId)?.classList.add('selected');
      break;
  }
};

UserPage = withChainedPages(UserPage, UserSubRoutes, updateLinks, 'users/');
export {
  UserPage,
  UserSubRoutes,
};
