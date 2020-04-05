import './style.sass';
import {
  withChainedPages,
  uuid,
  requestManager,
} from '../../ulils';
import template from './pug/index.pug';
import {Page} from '../../Page';
import {Navigator} from '../../Navigator';
import {RootPath, SubRoutes} from './subRoutes';
import {getUserId} from './getUserId';
import withLocalStore from './localStore';

/**
 * User Page component
 * Has subpages
 * settings
 * summaries
 * statistics
 * favourite
 */
class UserPage extends Page {
  
  #prevUser
  /**
   * returns container for subpages
   * @return{string}
   */
  render() {
    return template(this.props);
  }

  /**
   * 
   */
  componentDidMount() {

    const userId = getUserId();
    if(this.#prevUser !== userId) {
      this.#prevUser = userId;
      this.props.reloadStore();
      this.props.random = uuid();
      Navigator.updateAllPages();

      loadPersonInfo(this);
      loadPersonSummaries(this);
    }
  }
}

const loadPersonInfo = async (page) => {
  try {
    const userId = getUserId();
    const res = await requestManager.tryGetPerson(userId);
    const user = await res.json();

    page.props.setStore({
      user: {...user}
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
UserPage = withLocalStore(UserPage);
UserPage = withChainedPages(UserPage, SubRoutes, null, RootPath);
export {
  UserPage,
};
