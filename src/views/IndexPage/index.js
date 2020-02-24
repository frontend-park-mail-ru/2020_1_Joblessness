import {Page} from '../../Page';
import template from './IndexPage.pug';
import {withAuth} from '../../ulils';

/**
 * start page if unauth
 */
class IndexPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template();
  }
}

/**
 * start page if auth
 */
class StartPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return `Start Page`;
  }
}

IndexPage = withAuth(IndexPage, StartPage);

export {
  IndexPage,
};
