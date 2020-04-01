import {Page} from '../../../Page';
import {uuid} from '../../../ulils';
import {VacancyPreview} from './VacancyPreview';
import {ChosenButton} from '../ChosenButton';
import {Navigator} from '../../../Navigator';
import {constructSubRoutes} from '../subRoutes';

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
    let c = 0;
    const i = setInterval(
        () => {
          if (c === 1) {
            clearInterval(i);
          }
          c++;
          for (let i = 0; i < 4; i++) {
            this.props.requestNextNoUpdate({
              vacancyName: 'Frontend разработчик',
              salaryFrom: 70000,
              salaryTo: 90000,
            }, false);
          }
          this.props.requestNext({
            vacancyName: 'Frontend разработчик',
            salaryFrom: 70000,
            salaryTo: 90000,
          }, true);
        }, 520,
    );
  }
}


const beforeNext = (page, vac) => {
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
