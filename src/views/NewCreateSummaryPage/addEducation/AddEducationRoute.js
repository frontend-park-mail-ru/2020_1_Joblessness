import {AddEducationPage} from './index';
import {AtEditRoute} from './atEdit/AtEditRoute';
import {StartEditRoute} from './startEdit/StartEditRoute';

export const AddEducationRoute = [
  {
    element: new AddEducationPage('#create_summary_add_education'),
    path: 'addEducation',
    alwaysOn: true,
    next: '',
    innerNext: 'showEducation',
    innerPath: 'addEducation',
  },
  StartEditRoute,
  AtEditRoute,
];
