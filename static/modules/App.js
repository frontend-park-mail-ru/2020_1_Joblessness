"use strict";

import Navigator from './Navigator.js';

// запускает все приложение. Точка создание - навигатор
export default class App {
    constructor () {
        console.log("Application was created");
        new Navigator();
    }
}

window.addEventListener("load", function () {
    new App();
    document.querySelector("#app-box").hidden = false;
});
