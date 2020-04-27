import './style.sass';
import {
  withChainedPages,
  uuid,
  requestManager,
} from '../../ulils';
import template from './index.pug';
import {Page} from '../../Page';
import {Navigator} from '../../Navigator';
import {RootPath, ChainedRoutes} from './subRoutes';
import {getUserId} from './getUserId';
import withLocalStore from './localStore';
import {withAuthManager} from '../../ulils/AuthManager';

/**
 * User Page component
 * Has subpages
 * settings
 * summaries
 * statistics
 * favourite
 */
class UserPage extends Page {
  #prevUser;
  /**
   * returns container for subpages
   * @return{string}
   */
  render() {
    return template(this.props);
  }
  componentWillUpdate() {
    super.componentWillUpdate();
    if (this.#prevUser !== getUserId()) {
      this.#prevUser = getUserId();
      loadPersonInfo(this);
      loadPersonSummaries(this);
      this.props.random = uuid();
    }
  }

  /**
   *
   */
  componentDidMount() {
    super.componentDidMount();
    // const userId = getUserId();
    // if (this.#prevUser !== userId) {
    //   this.#prevUser = userId;
    //   loadPersonInfo(this);
    //   loadPersonSummaries(this);
    // }
  }
}

const loadPersonInfo = async (page) => {
  try {
    const userId = getUserId();
    const res = await requestManager.tryGetPerson(userId);
    const user = await res.json();

    page.props.setStore({
      user: {...user},
    });
    page.props.random = uuid();
    Navigator.updateAllPages();
  } catch (e) {
    alert('Не удалось загрузить данные пользователя.');
    console.log(e);
  }
};

const loadPersonSummaries = async (page) => {
  try {
    const userId = getUserId();
    const res = await requestManager.tryGetUserSummaries(userId);
    const summaries = await res.json();
    page.props.setStore({
      summaries: [...summaries],
    });
    page.props.random = uuid();
    Navigator.updateAllPages();
  } catch (e) {
    alert('Не удалось загрузить данные пользователя.');
    console.log(e);
  }
};
UserPage = withAuthManager(UserPage);
UserPage = withLocalStore(UserPage);
UserPage = withChainedPages(UserPage, ChainedRoutes, null, RootPath);
export {
  UserPage,
};