import './style.sass';
import {Page} from '../../Page';
import authHeader from './pug/auth_header.pug';
import unAuthHeader from './pug/unauth_header.pug';
import {withAuth} from '../../ulils';
import {appendEvents} from './appendEvents';

/**
 * auth header
 */
class AuthHeader extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return authHeader({
      userId: window.userId || '',
    });
  }
}
AuthHeader = appendEvents(AuthHeader);
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
