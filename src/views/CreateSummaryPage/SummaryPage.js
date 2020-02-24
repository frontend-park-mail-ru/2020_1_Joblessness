'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './pug/index.pug';

/**
 * summary creation forms
 */
class SummaryPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template();
  }
}

export {
  SummaryPage,
};
