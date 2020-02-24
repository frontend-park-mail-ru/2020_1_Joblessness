'use strict';

import {Page} from '../../Page.js';

/**
 * 404 page
 */
class NotFoundPage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return `<div>Page Was Not Found</div>`;
  }
}

export {
  NotFoundPage,
};
