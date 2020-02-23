import { Page } from '../../Page';
import template from './IndexPage.pug'
import {withAuth} from "../../ulils";

class IndexPage extends Page {

    render() {
        return template();
    }
}
class StartPage extends Page {
    render() {
        console.log(1);
        return `Start Page`
    }
}
IndexPage = withAuth(IndexPage, StartPage);
export {
    IndexPage
}