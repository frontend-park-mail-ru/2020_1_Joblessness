"use strict";

import { Navigator } from './Navigator.js';
import {Header} from "./views/Header";
import {Footer} from "./views/Footer";

class Index {
    /**
     * Создание неизменяемых элементов, таких как хедер и футер
     */
    constructor() {
        console.log("Application was created");
        new Header('body');
        let domBox = document.createElement("div");
        domBox.className = 'root';
        document.querySelector('body').appendChild(domBox);
        new Navigator();
        new Footer('body');
    }
}

window.addEventListener("load", function () {
    new Index();
});

export {
    Index,
}