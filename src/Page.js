"use strict";

/**
 * Page - класс от которого наследуются страницы
 * описывает общие методы и реализует метод создания в DOM бокса под страницу
 * наверное можно заменить на миксин createDomBox
 */
export class Page {

    constructor(container) {
        if (!!container) {
            this.container = document.querySelector(container);
        }
        this.render();
    }

    name() {
    }

    domName() {
        return `${this.name()}-page`;
    }

    getDomElem() {
        return document.querySelector(`.${this.domName()}`);
    }

    createDomBox(domName) {
        let domBox = document.createElement("div");
        domBox.className = `page ${domName}`;
        // все страницы по умолчанию скрыты
        domBox.hidden = true;
        console.log('!!!!!!!!!!' + this.container + ' - ' + this.domName());
        this.container.appendChild(domBox);
        return domBox;
    }

    render() {}
}
