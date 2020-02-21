"use strict";

import { Page } from '../../Page.js';

// наследуемся от страницы
class NotFoundPage extends Page {
    name(lang='en') {
        if (lang === 'en') {
            return 'not-found'
        } else if (lang === 'ru') {
            return 'not-found'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = `<div>Page Was Not Found</div>`
    }
}

export {
    NotFoundPage
}