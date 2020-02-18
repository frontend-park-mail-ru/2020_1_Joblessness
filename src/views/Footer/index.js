'use strict';

import { StaticPage } from "../../StaticPage";
import template from './Footer.pug'
import './style.css'

export class Footer extends StaticPage {

    name(lang = 'en') {
        if (lang === 'en') {
            return 'footer'
        } else if (lang === 'ru') {
            return 'Footer'
        }
    }

    render() {
        this.createDomBox(this.domName(), 'footer').innerHTML = template();
    }
}