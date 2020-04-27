import {Page} from '../../Page';
import template from './index.pug';
import './style.sass';
import {Routes} from './Container/routes';
import {Navigator} from '../../Navigator';
import {constructRoute, ROOT_ELEMENT} from './routes';
import {uuid} from '../../ulils';
import {withAuthManager} from '../../ulils/AuthManager';
import {ORGANIZATION} from '../../CONSTANTS';

class ResponsesPage extends Page {
  #lastUrl;
  render() {
    return template(this.props);
  }


  componentDidMount() {
    if (currentSession.user.role === ORGANIZATION) {
      document.querySelector(this.container).hidden = false;
      displayEvent(document.querySelector(this.container));
      // setTimeout(() =>
      // document.querySelector(this.container).click(), 100)
    } else {
      document.querySelector(this.container).hidden = true;
    }
  }
}

ResponsesPage = withAuthManager(ResponsesPage);
const displayEvent = (p) => {
  const e = (r) => {
    r.stopPropagation();
    const scroll = window.scrollY;
    p.classList.add('shown');
    document.getElementById('holder').style.overflow='hidden';
    document.getElementById('holder').style.height = '100vh';
    p.removeEventListener('click', e, scroll);
    closeEvent(document.querySelector('#responses_close'), p);
    Navigator.addRoutes(constructRoute(Routes));
    Navigator.updateAllPages();
  };
  p.addEventListener('click', e);
};

const closeEvent = (p, h, scroll) => {
  const e = (x) => {
    x.stopPropagation();
    h.classList.remove('shown');
    document.getElementById('holder').style.overflow='';
    document.getElementById('holder').style.height = '';

    p.removeEventListener('click', e);
    ROOT_ELEMENT.props.random = uuid();
    Navigator.removeRoutes(constructRoute());
    Navigator.updateAllPages();
    displayEvent(h);
  };
  p.addEventListener('click', e);
};
export {
  ResponsesPage,
};
