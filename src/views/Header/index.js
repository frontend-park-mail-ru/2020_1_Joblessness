import { Page } from "../../Page";
import authHeader from './pug/auth_header.pug'
import unAuthHeader from './pug/unauth_header.pug'
import './style.sass'
import {withAuth} from "../../ulils";

class AuthHeader extends Page {

    render() {
        return authHeader();
    }

}
class UnAuthHeader extends Page {
    render() {
        return unAuthHeader();
    }
}

const Header = withAuth(UnAuthHeader, AuthHeader);

export {
    Header
}