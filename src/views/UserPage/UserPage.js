'use strict';

import './style.sass'
import {Page} from '../../Page.js';
import template from './pug/index.pug';

class UserPage extends Page {

    render() {
        return template({...this.props.UserData});
    }
}

const withNetwork = (WrappedComponent, propName, defaultProps = {}) => {

    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            this.props[propName] = defaultProps;

            fetch("/api/userPage")
                .then(r => r.json())
                .then(json => {
                    console.log(json);
                    this.props[propName] = json;
                    if (!this.domBox.hidden)
                        this.requestRender()
                })
                .catch(console.log);
        }
    }
};
UserPage = withNetwork(UserPage, "UserData", {
    user: {
        avatar: ""
    }
});
export {
    UserPage,
    withNetwork,
}