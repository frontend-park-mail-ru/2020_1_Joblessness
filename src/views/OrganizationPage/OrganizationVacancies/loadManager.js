import {Page} from '../../../Page';
import {currentSession, requestManager, uuid} from '../../../ulils';
import {VacancyPreview} from './VacancyPreview';
import {ChosenButton} from '../ChosenButton';
import {Navigator} from '../../../Navigator';
import {constructSubRoutes} from '../subRoutes';
import {getOrgId} from '../getOrgInfo';
import {CreateVacancyButton} from './CreateVacancyButton';
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
      .then(async r => {
        const list = await r.json();
        this.props.requestNextNoUpdate(null);
        if(list.length > 0) {
          const last = list.pop();

          for(let item of list) {
            this.props.requestNextNoUpdate({
              vacancyName: item.name,
              salaryFrom: item['salary_from'],
              salaryTo: item['salary_to'],
              id: item.id,
            }, false);
          }

          this.props.requestNextNoUpdate({
            vacancyName: last.name,
            salaryFrom: last['salary_from'],
            salaryTo: last['salary_to'],
            id: last.id,
          }, true);
        }
      })
      .catch(console.log)
  }
}


const beforeNext = (page, vac) => {
  if(!vac) {
    page.props.vacancies = [];
    return;
  }
  vac.id = uuid();
  vac.chosen = {
    id: uuid(),
  };
  if (!page.props.vacancies) {
    page.props.vacancies = [];
  }
  page.props.vacancies.push(vac);
};
const afterNext = (page, vac, needUpdate) => {

  if(!vac) {
    Navigator.removeRoutes(constructRoute());
    Navigator.addRoutes(constructRoute(DEF_ROUTES));
    return;
  }

  const newPage = new VacancyPreview(`#${vac.id}`);
  newPage.props.vacancy = vac;
  const newRoute = {
    path: vac.id,
    alwaysOn: true,
    next: '',
    element: newPage,
    childRoutes: [{
      path: vac.chosen.id,
      alwaysOn: true,
      element: new ChosenButton(`#${vac.chosen.id}`),
    }],
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
