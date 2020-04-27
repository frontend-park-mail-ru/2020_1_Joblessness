import {Page} from '../../../Page';
import template from './index.pug';
import {uuid} from '../../../ulils';
import {withEvents} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {getUserId} from '../getUserId';

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
    updateLinks();
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    updateLinks();
  }
}

const settingsId = uuid();
const summariesId = uuid();
const favouritesId = uuid();
const recomendationsId = uuid();


const showSubPage = (name) => {
  Navigator.showPage(`/users/${getUserId()}/${name}`);
};

NavPage = withEvents(NavPage, 'events',
    {
      showSettings: {
        id: settingsId,
        eventName: 'click',
        event: (e, page, id) => {
          // page.props.random = uuid();
          showSubPage('settings');
        },
      },
      showSummaries: {
        id: summariesId,
        eventName: 'click',
        event: (e, page, id) => {
          // page.props.random = uuid();
          showSubPage('summaries');
        },
      },
      showFavourite: {
        id: favouritesId,
        eventName: 'click',
        event: (e, page, id) => {
          // page.props.random = uuid();
          showSubPage('favourites');
        },
      },
      showStatistics: {
        id: recomendationsId,
        eventName: 'click',
        event: (e, page, id) => {
          // page.props.random = uuid();
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
      document.getElementById(recomendationsId)?.classList.add('selected');
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
  NavPage,
};
