"use strict";

import {getBus} from "./getBus";

/**
 * Спрятать и очистить все страницы, кроме одной
 * @param pageDomName - имя открываемой страницы
 */
function showPage(pageDomName) {
    for (const [key, value] of Object.entries(getBus().pagesOnScreen)) {
        value.hidePage();
    }

    document.querySelector(`.${pageDomName}`).hidden = false;
}

/**
 * Спрятать и очистить все страницы
 */
function hideAll() {
    for (const [key, value] of Object.entries(getBus().pagesOnScreen)) {
        value.hidePage();
    }
}

export {
    hideAll,
    showPage,
}