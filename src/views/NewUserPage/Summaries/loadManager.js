import {Page} from '../../../Page';
import {currentSession, requestManager, uuid} from '../../../ulils';
import {SummaryPreview} from './SummaryPreview';
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
    if (!this._was) {
      requestManager
          .tryGetUserSummaries(getUserId())
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
          })
          .catch((r) => this._was = false);
      this._was = true;
    }
  }
}


const beforeNext = (page, vac) => {
  if (!vac) {
    page.props.summaries = [];
    return;
  }
  vac.innerId = uuid();
  vac.chosen = {
    id: vac.id,
    innerId: uuid(),
  };
  if (!page.props.summaries) {
    page.props.summaries = [];
  }
  page.props.summaries.push(vac);
};
const afterNext = (page, vac, needUpdate) => {
  if (!vac) {
    Navigator.removeRoutes(constructRoute());
    Navigator.addRoutes(constructRoute());
    return;
  }

  const newPage = new SummaryPreview(`#${vac.innerId}`);
  newPage.props.summary = vac;
  newPage.props.num = page.props.summaries.length;
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
    element: new LoadManager('#summaries_list_load_manager'),
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
    if (!document.querySelector('#summaries_list_load_manager')) {
      document.removeEventListener('scroll', ev);
      return;
    }
    if (window.scrollY + window.innerHeight >= getDocHeight()) {
      inProgress = true;
      try {
        const r = await requestManager.tryGetUserSummaries(getUserId(), pageNumber++);
        const sums = await r.json();
        const startLen = sums.length;
        if (sums.length > lastlen) {
          while (sums.length > lastlen + 1) {
            page.props.requestNextNoUpdate(sums.shift(), false);
          }
          page.props.requestNextNoUpdate(sums.shift(), true);
        } else {
          if (sums.length !== PAG_SIZE && lastlen !== PAG_SIZE) {
            return;
          }
          while (sums.length > 1) {
            page.props.requestNextNoUpdate(sums.shift(), false);
          }
          page.props.requestNextNoUpdate(sums.shift(), true);
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
