'use strict';

import { Page } from "../../Page";
import template from './Footer.pug'
import './style.css'

export class Footer extends Page {

    constructor(container) {
        super(container);
        this.getDomElem().hidden = false;
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'footer'
        } else if (lang === 'ru') {
            return 'footer'
        }
    }

    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        this.container.appendChild(domBox);
        return domBox;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }

}