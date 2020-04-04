import './style.sass';
import {Page} from '../../Page';
import template from './pug/header.pug'
import {ORGANIZATION, PERSON, UNAUTHORISED} from '../../CONSTANTS';
import {currentSession, requestManager} from '../../ulils';
import {Navigator} from '../../Navigator';
import {withAuthManager} from '../../ulils/AuthManager';

/**
 * auth header
 */
class Header extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template(this.props);
  }
  componentDidMount() {
    super.componentDidMount();
    const signOut = () => {
      requestManager.tryLogout({})
        .then(() => {
          document.getElementById('sign-out')?.removeEventListener('click', signOut)
          currentSession.session = null;
          Navigator.showPage('/')
        })
        .catch(() => {
          currentSession.session = null;
          Navigator.showPage('/')
        })
    }
    document.getElementById('sign-out')?.addEventListener('click', signOut);
  }
}

Header = withAuthManager(Header);
export {
  Header,
};
