'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './show-resume-page.pug';

/**
 * summary page
 */
class ShowResumePage extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template();
  }
}

export {
  ShowResumePage,
};
