import {AtEditPage} from './index';
import {uuid} from '../../../../ulils';
import ExperienceItem from '../../showExperience/ExperienceItem';
import {Navigator} from '../../../../Navigator';

let newRouteId = uuid();

const beforeNext = (page, exp) => {
  newRouteId = uuid();
  exp.id = newRouteId;
  if (!page.props.expList) {
    page.props.expList = [];
  }
  page.props.expList.push(exp);
};
const afterNext = (page, exp) => {
  const newPage = new ExperienceItem(`#${newRouteId}`);
  newPage.props.exp = exp;
  const newRoute = {
    path: newRouteId,
    alwaysOn: true,
    next: '',
    element: newPage,
  };
  page.props.insertSubPage(newRoute);

  Navigator.addRoutes([{
    path: 'summaries/create', // @TODO more flexible
    childRoutes: [
      {
        path: 'showExperience',
        childRoutes: [
          newRoute,
        ],
      },
    ],
  }]);
  Navigator.updateAllPages();
};

export const AtEditRoute = {
  element: new AtEditPage('#add_experience_at_edit'),
  path: 'any',
  useInner: true,
  innerNext: 'showExperience',
  prev: 'startEdit',
  beforeNext: (page, exp) => {
    beforeNext(page, exp);
  },

  afterNext: (page, exp) => {
    afterNext(page, exp);
  },
};
