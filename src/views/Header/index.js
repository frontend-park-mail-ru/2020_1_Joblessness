import {Page} from '../../Page';
import authHeader from './pug/auth_header.pug';
import unAuthHeader from './pug/unauth_header.pug';
import './style.sass';
import {withAuth} from '../../ulils';
import {Navigator} from '../../Navigator';
import {request} from '../../ulils';

/**
 * auth header
 */
class AuthHeader extends Page {
  #signOut;
  /**
   * init evennt for sign out
   * @param {any} args
   */
  constructor(args) {
    super(args);
    this.#signOut = () => {
      request.post('/api/users/logout', {}).then((r) => {
        window.userId = null;
        window.isAuthenticated = false;
        Navigator.updateAllPages();
      });
    };
  };
  componentDidMount = () => {
    document.getElementById('sign-out')
        .addEventListener('click', this.#signOut);
  };
  /**
   * @return {string} - page to render
   */
  render() {
    return authHeader({
      userId: window.userId || '',
    });
  }
}

/**
 * unauth header
 */
class UnAuthHeader extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return unAuthHeader();
  }
}

const Header = withAuth(UnAuthHeader, AuthHeader);

export {
  Header,
};
