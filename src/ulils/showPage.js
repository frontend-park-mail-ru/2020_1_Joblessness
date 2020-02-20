"use strict";

export function showPage(pageDomName) {
    console.log('PAGE');
    console.log(pageDomName);
    let allPages = document.getElementsByClassName("page");
    // for (let i = 0; i < allPages.length; i++) {
    //     allPages[i].hidden = true;
    // }
    document.querySelector(`.${pageDomName}`).hidden = false;
}