'use strict';

import './style.sass'
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import { withNetwork } from "./withNetwork";
import { uuid } from "../../ulils";

const withEvents = (WrappedComponent, propName, events) => {

    return class extends WrappedComponent {
        constructor(...args) {
            super(args);
            this.props[propName] = events;
        }
        componentDidMount = () => {
            Object.keys(events).map( e => {
                document.getElementById(events[e].id).addEventListener(events[e].eventName, (ev) => {
                    events[e].event(ev, this)
                })
            })
        }
    }
};
class UserPage extends Page {

    name () {
        return 'user-page'
    }
    render() {
        // console.log(this.props.UserData.summaries[0]);
        return template({
            ...this.props.userData,
            events : this.props.events,
        });
    }
}

UserPage = withNetwork("/api/userPage", UserPage, "userData", {
    user: {
        firstname : 'Имя',
        lastname : 'Фамилия',
        tag: '@username',
        avatar: 'default-avatar.jpg'
    },
    summaries : [
        {
            title: "Название резюме",
            contacts : {
                firstname: "Имя",
                lastname: "Фамилия",
                mobile: 89123456789,
                city: "Moscow",
            },
            info : {
                birth : {
                    year : 1900,
                    month : 1,
                    day : 1,
                },
                sex : "пол",
                country: "Гражданство",
                experience: "Опыт работы",
            },
            education : [
                {
                    degree : "Университет"
                }
            ]
        }
    ]
});

UserPage = withEvents(UserPage, "events", {
    changeAvatar : {
        id : uuid(),
        eventName : 'click',
        event: (a, b) => {
            console.log('change avatar')
        }
    },
    showMore : {
        id : uuid(),
        eventName : 'click',
        event: (a, b) => {
            //@TODO load more summaries from server
            b.props.userData.summaries = [
                ...b.props.userData.summaries,
                {
                    title: "Название резюме",
                    contacts : {
                        firstname: "Имя",
                        lastname: "Фамилия",
                        mobile: 89123456789,
                        city: "Moscow",
                    },
                    info : {
                        birth : {
                            year : 1900,
                            month : 1,
                            day : 1,
                        },
                        sex : "пол",
                        country: "Гражданство",
                        experience: "Опыт работы",
                    },
                    education : [
                        {
                            degree : "Университет"
                        }
                    ]
                }
            ];
            b.requestRender()
        }
    },
});
export {
    UserPage,
}