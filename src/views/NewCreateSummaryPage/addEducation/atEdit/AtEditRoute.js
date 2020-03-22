import {AtEditPage} from './index';
import {uuid} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';
import EducationItem from '../../showEducation/EducationItem';

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
  const newPage = new EducationItem(`#${newRouteId}`);
  newPage.props.exp = exp;
  const newRoute = {
    path: newRouteId,
    alwaysOn: true,
    next: '',
    element: newPage,
  };
  page.props.insertSubPage(newRoute);

  Navigator.addRoutes([{
    path: 'summaries/create',
    childRoutes: [
      {
        path: 'showEducation',
        childRoutes: [
          newRoute,
        ],
      },
    ],
  }]);
  Navigator.updateAllPages();
};

export const AtEditRoute = {
  element: new AtEditPage('#add_education_at_edit'),
  path: 'any',
  useInner: true,
  innerNext: 'showEducation',
  prev: 'startEdit',
  beforeNext: (page, exp) => {
    beforeNext(page, exp);
  },

  afterNext: (page, exp) => {
    afterNext(page, exp);
  },
};
