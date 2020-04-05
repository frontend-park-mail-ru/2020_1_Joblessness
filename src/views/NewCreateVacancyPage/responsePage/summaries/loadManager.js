import {Page} from '../../../../Page';
import {currentSession, requestManager, uuid} from '../../../../ulils';
import {SummaryPreview} from './SummaryPreview';
import {Navigator} from '../../../../Navigator';
import ROUTES, {constructRoute, DEF_ROUTES} from './routes';

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

    requestManager
      .tryGetUserSummaries(currentSession.user.id)
      .then(async r => {
        const list = await r.json();
        this.props.requestNextNoUpdate(null);
        if (list.length > 0) {
          const last = list.pop();
          for (let item of list) {
            this.props.requestNextNoUpdate(item, false);
          }

          this.props.requestNextNoUpdate(last, true);
        }
      })
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
    Navigator.addRoutes(constructRoute(DEF_ROUTES));
    return;
  }

  const newPage = new SummaryPreview(`#${vac.innerId}`);
  newPage.props.summary = vac;
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
    element: new LoadManager('#response_load_manager'),
    path: 'orgLoadManager',
    alwaysOn: true,
    innerNext: 'summaries',
    innerPath: 'orgLoadManager',
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
