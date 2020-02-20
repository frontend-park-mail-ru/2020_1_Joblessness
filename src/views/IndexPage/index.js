import { Page } from '../../Page';
import template from './IndexPage.pug'

export class IndexPage extends Page {

    render() {
        this.container.innerHTML = template();
    }
}