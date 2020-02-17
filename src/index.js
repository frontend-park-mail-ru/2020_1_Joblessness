"use strict";

import Navigator from './Navigator.js';

// запускает все приложение. Точка создание - навигатор
export default class Index {
    constructor() {
        console.log("Application was created");
        new Navigator();
    }
}

window.addEventListener("load", function () {
    new Index();
    document.querySelector("#root").hidden = false;
});
