import { Page } from '../../Page';
import template from './IndexPage.pug'

export class IndexPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'index'
        } else if (lang === 'ru') {
            return 'Стартовая'
        }
    }

    render() {
        return template();
    }
}