import {AtEditPage} from './index';
import {uuid} from '../../../../ulils';
import {Navigator} from '../../../../Navigator';
import EducationItem from '../../showEducation/EducationItem';

let newRouteId = uuid();

const beforeNext = (page, edu) => {
  newRouteId = uuid();
  edu.id = newRouteId;
  if (!page.props.eduList) {
    page.props.eduList = [];
  }
  page.props.eduList.push(edu);
};
const afterNext = (page, edu) => {
  const newPage = new EducationItem(`#${newRouteId}`);
  newPage.props.edu = edu;
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
  prev: 'startEditEdu',
  beforeNext: (page, exp) => {
    beforeNext(page, exp);
  },

  afterNext: (page, exp) => {
    afterNext(page, exp);
  },
};
