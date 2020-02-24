'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './resume-page.pug';

/**
 * summary creation forms
 */
class ResumePage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template();
  }
}

export {
  ResumePage,
};
