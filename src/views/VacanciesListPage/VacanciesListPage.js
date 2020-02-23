'use strict';

import {Page} from '../../Page.js';
import template from './VacanciesListPage.pug';
import './style.css';

// смотри пояснения к резюме
// eslint-disable-next-line require-jsdoc
class VacanciesListPage extends Page {
  // eslint-disable-next-line require-jsdoc
  constructor(container) {
    super(container);
  }

  // eslint-disable-next-line require-jsdoc
  name(lang='en') {
    if (lang === 'en') {
      return 'vacancies-list';
    } else if (lang === 'ru') {
      return 'список вакансий';
    }
  }

  SubmitVacancy() {
    document.querySelector('.button-list').addEventListener('click', (e) => {
      e.preventDefault();

      //ajax

    })
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    this.createDomBox(this.domName()).innerHTML = template();
  }
}

export {
  VacanciesListPage
}
