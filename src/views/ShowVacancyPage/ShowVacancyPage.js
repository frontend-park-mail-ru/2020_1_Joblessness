'use strict';

import './style.css';
import {Page} from '../../Page.js';
import template from './show-vacancy-page.pug';

/**
 * смотри пояснения к резюме
 */
class ShowVacancyPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template();
  }
}

export {
  ShowVacancyPage,
};
