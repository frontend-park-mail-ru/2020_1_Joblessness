import {Page} from '../../../Page';
import template from './index.pug'
import {Navigator} from '../../../Navigator'
import RESPONSES_ROUTES from '../Resonses/routes'
import MESSENGER_ROUTES from '../Messenger/routes'
import SETTINGS_ROUTES from '../Settings/routes'
import {constructRoute} from '../routes';
import withLocalStore from '../localStore';

class Navigation extends Page {

  render() {
    return template(this.props)
  }

  componentDidMount() {
    super.componentDidMount();
    const currentPage = this.props.getStore().currentPage;
    Navigator.addRoutes(getCurrentRoutes(currentPage));
    const parent = document.querySelector(this.container);

    const settings = parent.querySelector('.settings');
    const responses = parent.querySelector('.responses');
    const messenger = parent.querySelector('.messenger');
    const elems = [settings, responses, messenger];
    let el;
    if(currentPage === 'settings') el = settings;
    else if(currentPage === 'messenger') el = messenger;
    else el = responses;

    markElems(el, elems);

    openPage(this, responses, elems, constructRoute(RESPONSES_ROUTES), 'responses');
    openPage(this, messenger, elems, constructRoute(MESSENGER_ROUTES), 'messenger');
    openPage(this, settings, elems, constructRoute(SETTINGS_ROUTES), 'settings');
  }
}

const markElems = (toMark, elems) => {
  elems.forEach(e => e.classList.remove('current'));
  toMark.classList.add('current');
};

const getCurrentRoutes = (currentPage) => {
  switch (currentPage) {
    case 'responses':
      return constructRoute(RESPONSES_ROUTES);
    case 'messenger':
      return constructRoute(MESSENGER_ROUTES);
    case 'settings':
      return constructRoute(MESSENGER_ROUTES);
  }
  constructRoute(RESPONSES_ROUTES)
};

const openPage = (page, el,  elems, routesToAdd, routeName) => {
  const event = (e) => {
    Navigator.removeRoutes(constructRoute(RESPONSES_ROUTES));
    Navigator.removeRoutes(constructRoute(MESSENGER_ROUTES));
    Navigator.removeRoutes(constructRoute(SETTINGS_ROUTES));
    markElems(el, elems);
    page.props.setStore({currentPage: routeName}, () => {
      Navigator.addRoutes(routesToAdd);
      Navigator.updateAllPages();
    });
  };
  el.addEventListener('click', event);
};

Navigation = withLocalStore(Navigation);
export default Navigation;