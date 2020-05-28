import {Page} from '../../../Page';
import template from './index.pug';
import withLocalStore from '../localStore';
import {currentSession, fileToB64, uuid} from '../../../ulils';
import {DOMAIN} from '../../../ulils/request';
import {Navigator} from '../../../Navigator';

/**
 * Organization info subpage
 */
class OrganizationInfo extends Page {
  /**
   * @return{string}
   */
  #elemId;

  constructor(props) {
    super(props);
    this.#elemId = uuid();
  }

  componentWillUpdate() {
    super.componentWillUpdate();
    this.props.reloadStore();
  }

  render() {
    return template({
      itemId: this.#elemId,
      info: this.props.getStore().organization,
      currentId: currentSession.user.id,
      href: (!location.pathname.includes('organizations')) && this.props.getStore().organization.id !== currentSession.user.id && '/organizations/' + this.props.getStore().organization.id
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
          organization: {
            ...s.organization,
            avatar: b64,
          },
        }));
        Navigator.updateAllPages();
      }).catch(() => alert('Невозможно изменить аватар'));
    });
  }
}

const OrganizationInfoNoStore = OrganizationInfo;

OrganizationInfo = withLocalStore(OrganizationInfo);


export {
  OrganizationInfo,
  OrganizationInfoNoStore,
};
