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
        this.container.appendChild(domBox);
        return domBox;
    }

    clearPage() {
        document.querySelectorAll(`.${this.domName()} .input`).forEach( element => {
            if (element.type === 'text') {
                element.value = '';
            } else {
                element.checked = false;
            }
        });

        document.querySelectorAll(`.${this.domName()} .output`).forEach( element => {
            element.innerHTML = '';
        });
    }

    hidePage() {
        this.clearPage();
        this.getDomElem().hidden = true;
    }

    showPage() {
        this.getDomElem().hidden = false;
    }

    render() {}
}
