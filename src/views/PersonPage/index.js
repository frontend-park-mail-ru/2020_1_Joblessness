import './style.sass';
import {
  uuid,
  requestManager,
} from '../../ulils';
import template from './index.pug';
import {Page} from '../../Page';
import {Navigator} from '../../Navigator';
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
      this.props.random = uuid();
    }
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
    Navigator.updateAllPages();
  } catch (e) {
    alert('Не удалось загрузить данные пользователя.');
    console.log(e);
  }
};

UserPage = withLocalStore(UserPage);

export {
  UserPage,
};
