import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {FieldManager, uuid, withAuth, withEvents, withNetwork} from '../../ulils';
import {isPassword, isSlavicName} from '../../ulils/validators';
import defaultUser from './userDefault';
import {onOpenSettingsRequest, onSettingsChangeRequest, onUpdateAvatarRequest} from './events';
// UserPage class itself returns only html elements
// userData - user info loaded from server
// events - events attached to page
class UserPage extends Page {

    render() {
        return template({
            ...this.props.userData,
            events: this.props.events,
        });
    }
}

const prepareRequestBody = (page) => ({});
// preload data
UserPage = withNetwork('/api/userPage', prepareRequestBody, UserPage, 'userData', defaultUser);


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
    },
    'applyChanges'
);

UserPage = withEvents(UserPage, 'events',
    {
        ...fieldManager.fieldsToValidate,
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
class NoAuthUserPage extends Page {
    render() {
        return `Авторизируйтесь пожалуйста`
    }
}
UserPage = withAuth(NoAuthUserPage, UserPage);
export {
    UserPage,
}