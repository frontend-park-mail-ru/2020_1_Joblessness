'use strict';

import './style.sass'
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {withNetwork} from "./withNetwork";
import {uuid} from "../../ulils";
import {withEvents} from "./withEvents";

class UserPage extends Page {

    render() {
        return template({
            ...this.props.userData,
            events: this.props.events,
        });
    }
}
UserPage = withNetwork("/api/userPage", UserPage, "userData", {
    user: {
        firstname: 'Имя',
        lastname: 'Фамилия',
        tag: '@username',
        avatar: 'default-avatar.jpg'
    },
    summaries: [
        {
            title: "Название резюме",
            contacts: {
                firstname: "Имя",
                lastname: "Фамилия",
                mobile: 89123456789,
                city: "Moscow",
            },
            info: {
                birth: {
                    year: 1900,
                    month: 1,
                    day: 1,
                },
                sex: "пол",
                country: "Гражданство",
                experience: "Опыт работы",
            },
            education: [
                {
                    degree: "Университет"
                }
            ]
        }
    ]
});

UserPage = withEvents(UserPage, "events", {
    openSettings: {
        id : uuid(),
        eventName : 'click',
        event: (e, that) => {
            const el = document.getElementById('user-page-modal');
            el.style.display = 'flex';
            el.addEventListener('click', (e) => {
                if( e.target === el )
                    el.style.display = 'none'
            })
        }
    },
    validateFirstame: {
        id : uuid(),
        eventName : 'change',
        event: (e, that) => {
            console.log(e.target.value)
        }
    },
    validateLastName: {
        id : uuid(),
        eventName : 'change',
        event: (e, that) => {
            console.log(e.target.value)
        }
    },
    validatePassword: {
        id : uuid(),
        eventName : 'change',
        event: (e, that) => {
            console.log(e.target.value)
        }
    },
    changeAvatar: {
        id: uuid(),
        eventName: 'change',
        event: (e, that) => {
            let formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append('name', 'some value user types');
            formData.append('description', 'some value user types');
            console.log(e.target.files[0]);
            // console.log(a)
            fetch('/api/setAvatar', {
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    body: {
                        avatar: e.target.files[0]
                    }
                })
                .then(r => r.json())
                .then( d => {
                    console.log(d)
                    //@TODO load from server
                    that.props.userData.user.avatar = e.target.files[0].name
                    console.log(that.props)
                    that.requestRender()
                })
                .catch(console.log)
        }
    },
    showMore: {
        id: uuid(),
        eventName: 'click',
        event: (a, b) => {
            //@TODO load more summaries from server
            b.props.userData.summaries = [
                ...b.props.userData.summaries,
                {
                    title: "Название резюме",
                    contacts: {
                        firstname: "Имя",
                        lastname: "Фамилия",
                        mobile: 89123456789,
                        city: "Moscow",
                    },
                    info: {
                        birth: {
                            year: 1900,
                            month: 1,
                            day: 1,
                        },
                        sex: "пол",
                        country: "Гражданство",
                        experience: "Опыт работы",
                    },
                    education: [
                        {
                            degree: "Университет"
                        }
                    ]
                }
            ];
            b.requestRender()
        }
    },
});
const withSettings = (container, WrappedComponent) => {
    return class extends WrappedComponent {
        constructor(...args) {
            super(args)
        }
    }
};
UserPage = withSettings('user-page-modal', UserPage);
export {
    UserPage,
}