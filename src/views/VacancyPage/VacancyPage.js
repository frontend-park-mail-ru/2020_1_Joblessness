'use strict';

import Page from '../../../static/modules/Page.js';
import template from './vacancy-page.pug';

// смотри пояснения к резюме
class VacancyPage extends Page {
    constructor() {
        super();
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'vacancy'
        } else if (lang === 'ru') {
            return 'вакансии'
        }
    }

    validateForm() {
        let formIsValid = true;
        document.querySelectorAll('.input').forEach(input => {
            let inputIsValid = true;
            if (input.type === 'mail' && !input.type.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
                inputIsValid = false;
            } else if (input.type === 'tel' &&
                !input.type.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
                inputIsValid = false;
            } else if (input.type === 'text' && input.innerHTML === '') {
                inputIsValid = false;
            } else if (input.classList.contains('number_pos') && parseFloat(input.innerHTML) <= 0) {
                inputIsValid = false;
            } else if (input.type === 'number' && parseFloat(input.innerHTML) === 0) {
                inputIsValid = false;
            }

            if (!inputIsValid) {
                input.classList.add('form__invalid_input');
                formIsValid = false;
            } else {
                input.classList.remove('form__invalid_input');
            }
        });
        //TODO перенести в отдельный класс и унаследовать от него форму

        return formIsValid
    }

    addEventsOn() {
        document.querySelector('.vacancy_page__button_submit').addEventListener('click', () => {
            if ( this.validateForm() ) {
                console.log('da');
                //TODO создание запроса
            } else {
                console.log('ne');
            }
        })
    }

    //  не нужен, если используется pug
    // template() { // заменить на pug
    //     return `<div>ВАКАНСИИ</div>`;
    // }

    // был this.template, когда не было pug
    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}