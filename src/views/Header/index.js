'use strict';

import { Page } from "../../Page";
import template from './Header.pug'
import './style.css'

export class Header extends Page {

    render() {
        this.container.innerHTML = template();
    }
}