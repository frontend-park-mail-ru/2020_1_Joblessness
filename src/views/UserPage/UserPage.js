'use strict';

import './style.sass'
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {withNetwork} from './withNetwork';
import {uuid} from '../../ulils';
import {withEvents} from './withEvents';
import {FieldManager} from './FieldManager';
import {isPassword, isSlavicName} from '../../ulils/validators';
import defaultUser from './userDefault';
import {onOpenSettingsRequest, onUpdateAvatarRequest} from './events';

class UserPage extends Page {

    render() {
        return template({
            ...this.props.userData,
            events: this.props.events,
        });
    }
}

UserPage = withNetwork('/api/userPage', UserPage, 'userData', defaultUser);

const onSettingsChangeRequest = (event, that, field, callWarnings) => {
    const {validateFirstName, validateLastName, validatePassword} = field;
    if (validateFirstName && validateLastName && validatePassword) {
        //@TODO send request on server
        //Optimistic update
        that.props.userData.user.firstname = validateFirstName;
        that.props.userData.user.lastname = validateLastName;
        //Rerender page with new Data
        that.requestRender()
    } else {
        // Turn input fields red
        callWarnings()
    }
};

const fieldManager = new FieldManager(
    {
        validateFirstName: {
            id: uuid(),
            eventName: 'change',
            event: (e, that) => {
                return isSlavicName(e.target.value) ? e.target.value : null
            }
        },
        validateLastName: {
            id: uuid(),
            eventName: 'change',
            event: (e, that) => {
                return isSlavicName(e.target.value) ? e.target.value : null
            }
        },
        validatePassword: {
            id: uuid(),
            eventName: 'change',
            event: (e, that) => {
                return isPassword(e.target.value) ? e.target.value : null
            }
        }
    },
    {
        id: uuid(),
        eventName: 'click',
        event: onSettingsChangeRequest
    }
);

UserPage = withEvents(UserPage, 'events',
    {
        ...fieldManager.fieldsToValidate,
        applyChanges: fieldManager.acceptField,
        openSettings: {
            id: uuid(),
            eventName: 'click',
            event: onOpenSettingsRequest,
        },
        changeAvatar: {
            id: uuid(),
            eventName: 'change',
            event: onUpdateAvatarRequest,
        },
        showMore: {
            id: uuid(),
            eventName: 'click',
            event: (a, b) => {
                //@TODO load more summaries from server
                b.props.userData.summaries = [
                    ...b.props.userData.summaries,
                    defaultUser.summaries[0],
                ];
                b.requestRender()
            }
        },
    }
);
export {
    UserPage,
}