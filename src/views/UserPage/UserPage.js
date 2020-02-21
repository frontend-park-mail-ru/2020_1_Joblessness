'use strict';

import './style.css'
import { Page } from '../../Page.js';
import template from './pug/index.pug';

class UserPage extends Page {

    name(lang='en') {
        if (lang === 'en') {
            return 'user-page'
        } else if (lang === 'ru') {
            return 'Страница Пользователя'
        }
    }
    render() {
        console.log({...this.props.UserData})
        return template({...this.props.UserData});
    }
}

const withNetwork = (WrappedComponent, propName) => {

    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            fetch("/api/userPage")
                .then( r => r.json())
                .then( json => {
                    console.log(json);
                    this.props[propName] = json;
                    this.requestRender()
                });
        }
    }
};
export {
    UserPage,
    withNetwork,
}