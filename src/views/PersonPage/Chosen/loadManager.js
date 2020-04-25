import {Page} from '../../../Page';
import {currentSession, requestManager, uuid} from '../../../ulils';
import {ChosenPreview} from './ChosenPreview';
import {Navigator} from '../../../Navigator';
import {constructRoute} from './routes';
import {getDocHeight} from '../../SearchPage/Bar';
import {getUserId} from '../getUserId';

/**
 * Performs loading summaries
 */
class LoadManager extends Page {
  /**
   * No visual representation
   * @return {string}
   */
  render() {
    return '';
  }
  ComponentWillUpdate() {

  }
  /**
   *
   */
  componentDidMount() {
    super.componentDidMount();
    // document
    //   ?.addEventListener('scroll', loadOnScroll(this));
    if (!this._was) {
      requestManager
          .tryGetUserFavorites(getUserId())
          .then(async (r) => {
            const list = await r.json();
            this.props.requestNextNoUpdate(list);
          })
          .catch((r) => this._was = false);
      this._was = true;
    }
  }
}


const beforeNext = (page, list) => {
  list.forEach( (i) => i.innerId = uuid());
  page.props.chosen = list;
  Navigator.updateAllPages();
};
const afterNext = async (page, list, needUpdate) => {
  Navigator.removeRoutes(constructRoute());
  Navigator.addRoutes(constructRoute());
  for (const vac of list) {
    const newPage = new ChosenPreview(`#${vac.innerId}`);
    newPage.props.chosen = vac;
    if (vac.isPerson) {
      const r = await requestManager.tryGetPerson(vac.id);
      const pers = await r.json();
      newPage.props.person = pers;
      const newRoute = {
        path: vac.innerId,
        alwaysOn: true,
        next: '',
        element: newPage,
      };
      page.props.insertSubPage(newRoute);
      Navigator.addRoutes(constructRoute([newRoute]));
    } else {
      const r = await requestManager.tryGetOrg(vac.id);

      const org = await r.json();
      newPage.props.organization = org;
      const newRoute = {
        path: vac.innerId,
        alwaysOn: true,
        next: '',
        element: newPage,
      };
      page.props.insertSubPage(newRoute);
      Navigator.addRoutes(constructRoute([newRoute]));
    }
  }
  Navigator.updateAllPages();
};


const LoadManagerRoutes = [
  {
    element: new LoadManager('#chosen_list_load_manager'),
    path: 'loadManager',
    alwaysOn: true,
    innerNext: 'preview',
    innerPath: 'loadManager',
    useInner: true,
    beforeNext,
    afterNext,
  },
];

export {
  LoadManager,
  LoadManagerRoutes,
};

export default LoadManagerRoutes;


let pageNumber = 1;
let lastEv;
let lastlen;
let inProgress = false;
const PAG_SIZE = 10;
const loadOnScroll = (page) => {
  if (lastEv) {
    document.removeEventListener('scroll', lastEv);
  }
  const ev = async (e) => {
    if (inProgress) {
      return;
    }
    if (!document.querySelector('#chosen_list_load_manager')) {
      document.removeEventListener('scroll', ev);
      return;
    }
    if (window.scrollY + window.innerHeight >= getDocHeight()) {
      inProgress = true;
      try {
        const r = await requestManager.tryGetUserFavorites(getUserId(), pageNumber++);
        const chos = await r.json();
        const startLen = chos.length;
        if (chos.length > lastlen) {
          while (chos.length > lastlen + 1) {
            page.props.requestNextNoUpdate(chos.shift(), false);
          }
          page.props.requestNextNoUpdate(chos.shift(), true);
        } else {
          if (chos.length !== PAG_SIZE && lastlen !== PAG_SIZE) {
            return;
          }
          while (chos.length > 1) {
            page.props.requestNextNoUpdate(chos.shift(), false);
          }
          page.props.requestNextNoUpdate(chos.shift(), true);
        }
        lastlen = startLen;
        inProgress = false;
      } catch (e) {
        pageNumber--;
        inProgress = false;
      }
    }
  };
  lastEv = ev;
  return ev;
};
