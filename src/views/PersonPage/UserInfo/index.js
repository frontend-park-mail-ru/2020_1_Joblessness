import {Page} from '../../../Page';
import template from './index.pug';
import withLocalStore from '../localStore';
import {currentSession, fileToB64, uuid} from '../../../ulils';
import {DOMAIN} from '../../../ulils/request';
import {Navigator} from '../../../Navigator';
import {withAuthManager} from '../../../ulils/AuthManager';
import './style.sass'
/**
 * Organization info subpage
 */
class UserInfo extends Page {
  /**
   * @return{string}
   */
  #elemId;

  constructor(props) {
    super(props);
    this.#elemId = uuid();
  }

  render() {
    return template({
      itemId: this.#elemId,
      info: this.props.getStore().user,
      currentId: currentSession.user.id,
      id: (!location.pathname.includes('users')) && location.pathname.replace(/\D+/g, ''),
      href: (!location.pathname.includes('users')) && this.props.getStore().user.id !== currentSession.user.id && '/users/' + this.props.getStore().user.id
    });
  }

  componentDidMount() {
    super.componentDidMount();

    document.getElementById(this.#elemId)?.addEventListener('change', (e) => {
      const data = new FormData();

      data.append('file', e.target.files[0]);
      fetch(`${DOMAIN}/api/users/${currentSession.user.id}/avatar`, {
        method: 'POST',
        body: data,
      }).then(async () => {
        const b64 = await fileToB64(e.target.files[0]);
        this.props.setStore((s) => ({
          user: {
            ...s.user,
            avatar: b64,
          },
        }));
        Navigator.updateAllPages();
      }).catch(() => alert('Невозможно изменить аватар'));
    });
  }
}

const UserInfoNoStore = UserInfo;

UserInfo = withLocalStore(UserInfo);
UserInfo = withAuthManager(UserInfo);

export {
  UserInfo,
  UserInfoNoStore,
};
