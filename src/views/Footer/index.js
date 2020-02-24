'use strict';

import {Page} from '../../Page';
import template from './Footer.pug';
import './style.css';

/**
 * footer
 */
export class Footer extends Page {
  /**
   * @return {string} - page to render
   */
  render() {
    return template();
  }
}
