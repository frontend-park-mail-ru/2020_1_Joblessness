import {Page} from '../../Page';
import {Navigator} from '../../Navigator';
import template from './index.pug'
import './style.sass'
import {withAuthManager} from '../../ulils/AuthManager';
import {currentSession, requestManager} from '../../ulils';
import {ORGANIZATION, PERSON, UNAUTHORISED} from '../../CONSTANTS';
import ws from '../../ws';

const USER = 'USER';
const ORGP = 'ORGP';
const AUTH = 'AUTH';
const SUMM = 'SUMM';
const VACC = 'VACC';
const HOME = 'HOME';
const HOME_VAC = 'HOME_VAC';
const HOME_ORG = 'HOME_ORG';
const HOME_USR = 'HOME_USR';
const CLASS = 'current';
const RESPS = 'RESPS';
class NavigationBar extends Page {
  render() {
    return template({
      user: currentSession.user,
    });
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    updateLinks(this);
    updateContainer(this);
  }

  componentDidMount() {
    super.componentDidMount();
    document.getElementById('sign-out')?.
      addEventListener('click', signOut);
    const mask = document.querySelector('#nav_bar_mask');
    this.getContainer().addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.getContainer().classList.toggle('open');
      mask.classList.toggle('open')
    });
    mask.addEventListener('click', () => {
      this.getContainer().classList.remove('open');
      mask.classList.remove('open')
    })
    document.querySelector('#nav_bar_back').addEventListener('click', () => {
      window.history.back()
    })
    updateContainer(this);
    updateLinks(this);
  }
}

export default NavigationBar

NavigationBar = withAuthManager(NavigationBar);

export {
  NavigationBar
};

const signOut = () => {
  requestManager.tryLogout({})
    .then(() => {
      document.getElementById('sign-out')?.removeEventListener('click', signOut);
      ws.close();
      currentSession.session = null;
      Navigator.showPage('/');
    })
    .catch(() => {
      currentSession.session = null;
      ws.close();
      Navigator.showPage('/');
    });
};

const updateLinks = (page) => {
  const container = page.getContainer();
  // all possible links
  const org = container.querySelector('.nav--org');
  const user = container.querySelector('.nav--user');
  const auth = container.querySelector('.nav--auth');

  const start = container.querySelector('.nav--home');
  const startVacs = container.querySelector('.nav--vacs');
  const startUsers = container.querySelector('.nav--people');

  const vac = container.querySelector('.nav--vac');
  const sum = container.querySelector('.nav--sum');
  const res = container.querySelector('.nav--res');

  const links = [org, res, user, auth, start, startVacs, startUsers, vac, sum];
  links.forEach(l => l?.classList.remove(CLASS));
  if(window.location.pathname.includes('vacancies/') && window.location.pathname.includes('response')) {
    document.querySelector('#nav_bar_back')?.classList.remove('not-shown')
  } else {
    document.querySelector('#nav_bar_back')?.classList.add('not-shown')
  }
  const current = getCurrentPage();
  if(currentSession.user.role === ORGANIZATION) {
    switch (current) {
      case ORGP: updateLink(org); break;
      case HOME: updateLink(start); break;
      case HOME_USR: updateLink(startUsers); break;
      case VACC: updateLink(vac); break;
      case RESPS: updateLink(res); break;
    }
    return;
  }
  if(currentSession.user.role === UNAUTHORISED) {
    switch (current) {
      case HOME: updateLink(start); break;
      case HOME_VAC: updateLink(startVacs); break;
      case AUTH: updateLink(auth); break;
    }
    return;
  }
  if(currentSession.user.role === PERSON) {
    switch (current) {
      case USER: updateLink(user); break;
      case HOME: updateLink(start); break;
      case HOME_VAC: updateLink(startVacs); break;
      case SUMM: updateLink(sum); break;
    }
    return;
  }
}

const getCurrentPage = () => {
  const path = window.location.pathname;
  // Can be sped up using Regexp groups
  if(path.includes('signup')) return AUTH;
  if(path.includes('responses')) return RESPS;
  if(path.includes('search/vacancies')) return HOME_VAC;
  if(path.includes('search/users')) return HOME_USR;
  if(path.includes('search/organizations')) return HOME_ORG;
  if(path.includes('search')) return HOME;

  if(path.includes('users')) return USER;

  if(path.includes('organization')) return ORGP;
  if(path.includes('summaries')) return SUMM;
  if(path.includes('vacancies')) return VACC;

  return HOME;
};
const updateLink = (link) => link?.classList.add(CLASS);

const updateContainer = (page) => {
  const container = page.getContainer();
  const current = getCurrentPage();
  container.classList.remove('user');
  container.classList.remove('vac');
  container.classList.remove('sum');
  container.classList.remove('org');
  if(current === USER) {
    container.classList.add('user')
  } else if(current === VACC) {
    container.classList.add('vac')
  } else if(current === SUMM) {
    container.classList.add('sum')
  } else if(current === ORGP) {
    container.classList.add('org')
  }
}