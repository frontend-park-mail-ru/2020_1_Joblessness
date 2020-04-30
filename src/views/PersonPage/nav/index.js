import {Page} from '../../../Page';
import template from './index.pug';
import {uuid} from '../../../ulils';
import {withEvents} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {getUserId} from '../getUserId';
import {withAuthManager} from '../../../ulils/AuthManager';

/**
 *
 */
class NavPage extends Page {
  /**
   *
   */
  render() {
    return template(this.props);
  }
  /**
   * select desired link on reload
   */
  componentDidMount() {
    super.componentDidMount();
    updateLinks(this);
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    updateLinks(this);
  }
}

const settingsId = uuid();
const summariesId = uuid();
const favouritesId = uuid();
const recomendationsId = uuid();


const showSubPage = (name, personOnly) => {
  if(personOnly) {
    if(getUserId() !== currentSession.user.id)
      return;
  }
  Navigator.showPage(`/users/${getUserId()}/${name}`);
};

NavPage = withEvents(NavPage, 'events',
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
          showSubPage('favourites', true);
        },
      },
      showStatistics: {
        id: recomendationsId,
        eventName: 'click',
        event: (e, page, id) => {
          showSubPage('', true);
        },
      },
    },
);

const updateLinks = (page) => {
  const section = window.location.pathname.split('/');
  const list = document.querySelectorAll('.selected');
  for (const l of list) {
    l.classList.remove('selected');
  }
  switch (section[section.length - 1]) {
    case 'settings':
      document.getElementById(settingsId)?.classList.add('selected');
      break;
    case 'summaries':
      document.getElementById(summariesId)?.classList.add('selected');
      break;
    case 'favourites':
      document.getElementById(favouritesId)?.classList.add('selected');
      break;
    default:
      if(page.props.user.id !== getUserId()) {
        showSubPage('summaries');
      } else {
        document.getElementById(recomendationsId)?.classList.add('selected');
      }
      break;
  }
  const r = document.getElementById(recomendationsId);
  const c = document.getElementById(favouritesId);

  if(page.props.user.id !== getUserId()) {
    if(r) {
      r.style.display = 'none';
    }
    if(c) {
      c.style.display = 'none';
    }
  } else {
    if(r) {
      r.style.display = 'block';
    }
    if(c) {
    }
  }
};

NavPage = withAuthManager(NavPage);
export {
  NavPage,
};
