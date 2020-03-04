import './style.sass'
import {
  withChainedPages,
  withEvents,
  withNetwork,
  uuid,
  currentSession
} from '../../ulils';
import template from './pug/index.pug'
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

class UserPage extends Page {
  render() {
    return template(this.props)
  }

  componentDidMount() {
    updateLinks();
  }
}

UserPage = appendWithNetwork(UserPage);
const settings_id = uuid();
const summaries_id = uuid();
const favourites_id = uuid();
const statistics_id = uuid();


UserPage = withEvents(UserPage, 'events',
  {
    showSettings: {
      id: settings_id,
      eventName: 'click',
      event: (e, page, id) => {
        //@TODO refactor
        const path = window.location.pathname.replace(/\D+$/g, '');
        if (!path) {
          if (window.location.pathname.endsWith('users/')) {
            Navigator.showPage(window.location.pathname  + currentSession.user.id + '/settings')
          } else {
            Navigator.showPage(window.location.pathname + '/' + currentSession.user.id + '/settings')
          }
        } else {
          Navigator.showPage(path + '/settings')
        }
      }
    },
    showSummaries: {
      id: summaries_id,
      eventName: 'click',
      event: (e, page, id) => {
        const path = window.location.pathname.replace(/\D+$/g, '');
        if (!path) {
          if (window.location.pathname.endsWith('users/')) {
            Navigator.showPage(window.location.pathname  + currentSession.user.id + '/summaries')
          } else {
            Navigator.showPage(window.location.pathname  + '/' + currentSession.user.id + '/summaries')
          }
        } else {
          Navigator.showPage(path + '/summaries')
        }
      }
    },
    showFavourite: {
      id: favourites_id,
      eventName: 'click',
      event: (e, page, id) => {
        const path = window.location.pathname.replace(/\D+$/g, '');
        if (!path) {
          if (window.location.pathname.endsWith('users/')) {
            Navigator.showPage(window.location.pathname  + currentSession.user.id + '/favourites')
          } else {
            Navigator.showPage(window.location.pathname + '/' + currentSession.user.id + '/favourites')
          }
        } else {
          Navigator.showPage(path + '/favourites')
        }
      }
    },
    showStatistics: {
      id: statistics_id,
      eventName: 'click',
      event: (e, page, id) => {
        const path = window.location.pathname.replace(/\D+$/g, '');
        if (!path) {
          if (window.location.pathname.endsWith('users/')) {
            Navigator.showPage(window.location.pathname + currentSession.user.id + '/')
          } else {
            Navigator.showPage(window.location.pathname + '/' + currentSession.user.id + '/')
          }
        } else {
          Navigator.showPage(path + '/')
        }
      }
    },
    changeAvatar: {
      id: uuid(),
      eventName: 'change',
      event: changeAvatar
    }
  }
);

const updateLinks = () => {
  const section = window.location.pathname.split('/');
  const list = document.querySelectorAll('.selected');
  for (let l of list) {
    l.classList.remove('selected')
  }
  switch (section[section.length - 1]) {
    case '' :
      document.getElementById(statistics_id)?.classList.add('selected');
      break;
    case 'settings' :
      document.getElementById(settings_id)?.classList.add('selected');
      break;
    case 'summaries' :
      document.getElementById(summaries_id)?.classList.add('selected');
      break;
    case 'favourites' :
      document.getElementById(favourites_id)?.classList.add('selected');
      break;
  }
};

UserPage = withChainedPages(UserPage, UserSubRoutes, updateLinks, 'users/');
export {
  UserPage,
  UserSubRoutes,
}