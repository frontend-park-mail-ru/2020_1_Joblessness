import {Page} from '../../Page';
import './style.sass';
import template from './pug/index.pug';
import '../sharableStyle.sass';
import {requestManager, uuid, withChainedPages} from '../../ulils';
import {SubRoutes, RootPath} from './routes';
import withLocalStore from './localStore';
import {getOrgId} from './getOrgInfo';
import {Navigator} from '../../Navigator';
import {withAuthManager} from '../../ulils/AuthManager';

/**
 *
 */
class OrganizationPage extends Page {
  /**
   * @return {string}
   */
  #prevOrg = null;
  render() {
    return template(this.props);
  }

  componentDidMount() {
    super.componentDidMount();
    const orgId = getOrgId();
    if(this.#prevOrg !== orgId) {
      this.#prevOrg = orgId;
      this.props.reloadStore();
      this.props.random = uuid();
      Navigator.updateAllPages();
      requestManager.tryGetOrg(orgId)
        .then( async (r) => {
          const res = await r.json();
          if(!res.about) {
            res.about = ''
          }
          const mainInfoStr = res.about.replace(/&#34;/g, '"');
          this.props.setStore(s => ({
            organization: {
              tag: '',
              ...res,
            },
            mainInfo: mainInfoStr ? JSON.parse(mainInfoStr) : {
              raw: [],
              preview: [],
            }
          }));
          Navigator.updateAllPages();
        })
        .catch(console.log)
    }
  }
}
OrganizationPage = withAuthManager(OrganizationPage);
OrganizationPage = withLocalStore(OrganizationPage);
OrganizationPage = withChainedPages(OrganizationPage, SubRoutes,
    null, RootPath);
export {
  OrganizationPage,
};
