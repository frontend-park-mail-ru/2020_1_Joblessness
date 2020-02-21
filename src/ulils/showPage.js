"use strict";

import {getBus} from "./getBus";

function showPage(pageDomName) {
    for (const [key, value] of Object.entries(getBus().pagesOnScreen)) {
        value.hidePage();
    }

    document.querySelector(`.${pageDomName}`).hidden = false;
}

function hideAll() {
    for (const [key, value] of Object.entries(getBus().pagesOnScreen)) {
        value.hidePage();
    }
}

export {
    hideAll,
    showPage,
}