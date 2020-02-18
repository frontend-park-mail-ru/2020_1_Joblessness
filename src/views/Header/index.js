'use strict';

import { StaticPage } from "../../StaticPage";
import template from './Header.pug'
import './style.css'

export class Header extends StaticPage {

    name(lang = 'en') {
        if (lang === 'en') {
            return 'header'
        } else if (lang === 'ru') {
            return 'Header'
        }
    }

    render() {
        this.createDomBox(this.domName(), 'header').innerHTML = template();
    }
}