import { Page } from '../../Page';
import template from './IndexPage.pug'

export class IndexPage extends Page {
    constructor(container) {
        super(container);
        this.getDomElem().hidden = false;
    }

    name(lang='en') {
        if (lang === 'en') {
            return 'index'
        } else if (lang === 'ru') {
            return 'Стартовая'
        }
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = template();
    }
}