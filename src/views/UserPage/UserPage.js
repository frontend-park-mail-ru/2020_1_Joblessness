import './style.sass';
import {Page} from '../../Page.js';
import template from './pug/index.pug';
import {FieldManager, uuid,
  withEvents, withNetwork} from '../../ulils';
import {isPassword, isSlavicName} from '../../ulils/validators';
import defaultUser from './userDefault';
import {onOpenSettingsRequest, onSettingsChangeRequest,
  onUpdateAvatarRequest} from './events';
import {GET_HEADERS} from '../../ulils/postRequest';
import {Navigator} from '../../Navigator';

/**
 * UserPage class itself returns only html elements
 * userData - user info loaded from server
 * events - events attached to page
 */
class UserPage extends Page {
  /**
     * @return {string} - page to render
     */
  render() {
    return template({
      ...this.props.userData,
      events: this.props.events,
    });
  }
}

const prepareRequestBody = (page) => (GET_HEADERS);
const parseResponse = async (r) => {
  if (r.status === 404) {
    Navigator.showPage('404');
    return null;
  }
  const j = await r.json();
  console.log(j);
  return {
    user: {
      firstname: j.user['first-name'],
      lastname: j.user['last-name'],
      avatar: j.user.avatar,
    },
    summaries: j.summaries,
  };
};
// preload data
const getUserId = () => {
  const name = location.pathname;
  console.log(name);
  if (name.startsWith('/users/')) {
    return name.replace('/users/', '') ||
      window.userId || 1;
  }
  return window.userId || 1;
};
UserPage = withNetwork(
    () => (`http://91.210.170.6:8000/api/user/${getUserId()}`),
    prepareRequestBody,
    UserPage, 'userData', defaultUser, parseResponse);

const fieldManager = new FieldManager(
    {
      validateFirstName: {
        id: uuid(),
        eventName: 'change',
        event: (e, that) => {
          return isSlavicName(e.target.value) ? e.target.value : null;
        },
      },
      validateLastName: {
        id: uuid(),
        eventName: 'change',
        event: (e, that) => {
          return isSlavicName(e.target.value) ? e.target.value : null;
        },
      },
      validatePassword: {
        id: uuid(),
        eventName: 'change',
        event: (e, that) => {
          return isPassword(e.target.value) ? e.target.value : null;
        },
      },
    },
    {
      id: uuid(),
      eventName: 'click',
      event: onSettingsChangeRequest,
    },
    'applyChanges',
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
          // @TODO load more summaries from server
          b.props.userData.summaries = [
            ...b.props.userData.summaries,
            defaultUser.summaries[0],
          ];
          b.requestRender();
        },
      },
    },
);
/**
 * unauthorised user page
 */
// class NoAuthUserPage extends Page {
//   /**
//    *
//    * @return {string} - page to render
//    */
//   render() {
//     return `Авторизируйтесь пожалуйста`;
//   }
// }
// UserPage = withAuth(NoAuthUserPage, UserPage);
export {
  UserPage,
};
