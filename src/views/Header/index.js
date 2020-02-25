import {Page} from '../../Page';
import authHeader from './pug/auth_header.pug';
import unAuthHeader from './pug/unauth_header.pug';
import './style.sass';
import {withAuth} from '../../ulils';
import {Navigator} from '../../Navigator';

/**
 * auth header
 */
class AuthHeader extends Page {
  #signOut;
  #wasCalled;
  /**
   * init evennt for sign out
   * @param {any} args
   */
  constructor(args) {
    super(args);
    this.#wasCalled = false;
    this.#signOut = () => {
      document.cookie = 'reg_data=; ' +
        'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.isAuthenticated = false;
      Navigator.updateAllPages();
    };
  };
  componentDidMount = () => {
    if (!this.#wasCalled) {
      document.getElementById('sign-out')
          .addEventListener('click', this.#signOut);
    }
    this.#wasCalled = true;
  };
  /**
   * @return {string} - page to render
   */
  render() {
    return authHeader();
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
