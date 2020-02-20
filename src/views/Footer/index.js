'use strict';

import { Page } from "../../Page";
import template from './Footer.pug'
import './style.css'

export class Footer extends Page {

    render() {
        this.container.innerHTML = template();
    }
}