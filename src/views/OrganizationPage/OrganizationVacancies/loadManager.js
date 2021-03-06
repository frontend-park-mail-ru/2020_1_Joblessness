import {Page} from '../../../Page';
import {currentSession, requestManager, uuid} from '../../../ulils';
import {VacancyPreview} from './VacancyPreview';
import {Navigator} from '../../../Navigator';
import {constructSubRoutes} from '../subRoutes';
import {getOrgId} from '../getOrgInfo';
import ROUTES, {constructRoute, DEF_ROUTES} from './routes';
/**
 * Performs loading vacancies
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

    requestManager.tryGetOrgVacancies(getOrgId())
        .then(async (r) => {
          const list = await r.json();
          this.props.requestNextNoUpdate(null);
          if (list.length > 0) {
            const last = list.pop();

            for (const item of list) {
              this.props.requestNextNoUpdate({
                vacancyName: item.name,
                salaryFrom: item.salaryFrom,
                salaryTo: item.salaryTo,
                id: item.id,
              }, false);
            }

            this.props.requestNextNoUpdate({
              vacancyName: last.name,
              salaryFrom: last.salaryFrom,
              salaryTo: last.salaryTo,
              id: last.id,
            }, true);
          }
        })
        .catch(console.log);
  }
}


const beforeNext = (page, vac) => {
  if (!vac) {
    page.props.vacancies = [];
    return;
  }
  vac.innerId = uuid();
  vac.chosen = {
    id: vac.id,
    innerId: uuid(),
  };
  if (!page.props.vacancies) {
    page.props.vacancies = [];
  }
  page.props.vacancies.push(vac);
};
const afterNext = (page, vac, needUpdate) => {
  if (!vac) {
    Navigator.removeRoutes(constructRoute());
    Navigator.addRoutes(constructRoute(DEF_ROUTES));
    return;
  }

  const newPage = new VacancyPreview(`#${vac.innerId}`);
  newPage.props.vacancy = vac;
  const newRoute = {
    path: vac.innerId,
    alwaysOn: true,
    next: '',
    element: newPage,
  };
  page.props.insertSubPage(newRoute);

  Navigator.addRoutes(
      constructSubRoutes([
        {
          path: 'orgVacancies',
          childRoutes: [
            newRoute,
          ],
        },
      ]),
  );
  needUpdate && Navigator.updateAllPages();
};


const LoadManagerRoutes = [
  {
    element: new LoadManager('#organization_vacancy_load_manager'),
    path: 'orgLoadManager',
    alwaysOn: true,
    innerNext: 'orgVacancies',
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
