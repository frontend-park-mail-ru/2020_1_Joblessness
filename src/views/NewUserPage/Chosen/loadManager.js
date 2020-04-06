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

  /**
   *
   */
  componentDidMount() {
    super.componentDidMount?.();
    document
      ?.addEventListener('scroll', loadOnScroll(this));
    if(!this._was) {
      requestManager
        .tryGetUserFavorites(getUserId())
        .then(async (r) => {
          const list = await r.json();
          this.props.requestNextNoUpdate(null);
          if (list.length > 0) {
            const last = list.pop();
            for (const item of list) {
              this.props.requestNextNoUpdate(item, false);
            }

            this.props.requestNextNoUpdate(last, true);
          }
        });
      this._was = true
    }

  }
}


const beforeNext = (page, vac) => {
  if (!vac) {
    page.props.chosen = [];
    return;
  }
  vac.innerId = uuid();

  if (!page.props.chosen) {
    page.props.chosen = [];
  }
  page.props.chosen.push(vac);
};
const afterNext = (page, vac, needUpdate) => {
  if (!vac) {
    Navigator.removeRoutes(constructRoute());
    Navigator.addRoutes(constructRoute());
    return;
  }

  const newPage = new ChosenPreview(`#${vac.innerId}`);
  newPage.props.chosen = vac;
  newPage.props.num = page.props.chosen.length
  const newRoute = {
    path: vac.innerId,
    alwaysOn: true,
    next: '',
    element: newPage,
  };
  page.props.insertSubPage(newRoute);
  Navigator.addRoutes(constructRoute([newRoute]));
  needUpdate && Navigator.updateAllPages();
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
const PAG_SIZE = 10
const loadOnScroll = (page) => {
  if (lastEv)
    document.removeEventListener('scroll', lastEv);
  const ev = async (e) => {
    if(inProgress)
      return;
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
          while (chos.length > lastlen + 1)
            page.props.requestNextNoUpdate(chos.shift(), false);
          page.props.requestNextNoUpdate(chos.shift(), true);
        } else {
          if (chos.length !== PAG_SIZE && lastlen !== PAG_SIZE) {
            return;
          }
          while (chos.length > 1)
            page.props.requestNextNoUpdate(chos.shift(), false);
          page.props.requestNextNoUpdate(chos.shift(), true);
        }
        lastlen = startLen;
        inProgress = false;
      } catch (e) {
        inProgress = false
      }
    }
  };
  lastEv = ev;
  return ev;
};