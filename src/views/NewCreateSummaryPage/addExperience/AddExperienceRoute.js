import {uuid} from '../../../ulils';
import ExperienceItem from '../showExperience/ExperienceItem';
import {Navigator} from '../../../Navigator';
import {AddExperiencePage} from '../addExperience';

let newRouteId = uuid();
export const AddExperienceRoute = {
  element: new AddExperiencePage('#create_summary_add_experience'),
  path: 'showExperience',
  alwaysOn: true,
  next: '',
  innerNext: 'showExperience',
  innerPath: 'addExperience',

  beforeNext: (page, exp) => {
    newRouteId = uuid();
    exp.id = newRouteId;
    if (!page.props.expList)
      page.props.expList = [];
    page.props.expList.push(exp);
  },

  afterNext: (page, exp) => {
    const newPage = new ExperienceItem(`#${newRouteId}`);
    newPage.props.exp = exp;
    const new_route = {
      path: newRouteId,
      alwaysOn: true,
      next: '',
      element: newPage,
    };
    page.props.insertSubPage(new_route);

    Navigator.addRoutes([{
      path: 'summaries/create', //@TODO more flexible
      childRoutes: [
        {
          path: 'showExperience',
          childRoutes: [
            new_route
          ]
        }
      ]
    }]);
    Navigator.updateAllPages()
  },
};