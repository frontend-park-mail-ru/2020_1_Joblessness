import {Page} from '../../../Page';
import template from './index.pug'
import {uuid} from '../../../ulils';
import {withEvents} from '../../../ulils';
import {Navigator} from '../../../Navigator';

/**
 *
 */
class NavPage extends Page{

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
    updateLinks();
  }
}

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

NavPage = withEvents(NavPage, 'events',
  {
    showSettings: {
      id: settingsId,
      eventName: 'click',
      event: (e, page, id) => {
        page.props.random = uuid();
        showSubPage('settings');
      },
    },
    showSummaries: {
      id: summariesId,
      eventName: 'click',
      event: (e, page, id) => {
        page.props.random = uuid();
        showSubPage('summaries');
      },
    },
    showFavourite: {
      id: favouritesId,
      eventName: 'click',
      event: (e, page, id) => {
        page.props.random = uuid();
        showSubPage('favourites');
      },
    },
    showStatistics: {
      id: statisticsId,
      eventName: 'click',
      event: (e, page, id) => {
        page.props.random = uuid();
        showSubPage('');
      },
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

export {
  NavPage
}