'use strict';

import { Page } from "../../Page";
import template from './Footer.pug'
import './style.css'

export class Footer extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'footer'
        } else if (lang === 'ru') {
            return 'footer'
        }
    }

    render() {
        return template();
    }

}