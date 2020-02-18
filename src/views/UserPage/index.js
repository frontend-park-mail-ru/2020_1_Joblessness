import { Page } from "../../Page";

class UserPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'Profile'
        } else if (lang === 'ru') {
            return 'Профиль'
        }
    }

    template() { // заменить на pug
        return `<div>Пользователь</div>`;
    }

    render() {
        this.createDomBox(this.domName()).innerHTML = this.template();
    }
}

export {
    UserPage
}