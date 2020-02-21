'use strict';

import { Page } from "../../Page";
import template from './Header.pug'
import './style.css'

export class Header extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'header'
        } else if (lang === 'ru') {
            return 'header'
        }
    }

    render() {
        return template();
    }

}