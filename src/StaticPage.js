import { Page } from "./Page";

export class StaticPage extends Page {
    createDomBox(domName, root) {
        let domBox = document.createElement("div");
        domBox.className = `static-page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        document.querySelector(`#${root}`).appendChild(domBox);
        return domBox;
    }
}