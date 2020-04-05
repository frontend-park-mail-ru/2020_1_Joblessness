import {AddEducationPage} from './addEducation';
import {ShowEducationPage} from './showEducation';
import {UserInfo} from '../NewUserPage/UserInfo';
import {ShowExperiencePage} from './showExperience';
import {AddExperienceRoute} from './addExperience/AddExperienceRoute';
import {AddEducationRoute} from './addEducation/AddEducationRoute';

const CreateSummaryRoutes = [
  {
    path: 'info',
    next: '',
    alwaysOn: true,
    element: new UserInfo('#create_summary_person_info'),
  },
  {
    path: 'addEducation',
    next: '',
    innerNext: 'showEducation',
    alwaysOn: true,
    innerPath: 'addEducation',
    element: new AddEducationPage('#create_summary_add_education'),
  },
  {
    path: 'showExperience',
    next: '',
    alwaysOn: true,
    innerPath: 'showExperience',
    element: new ShowExperiencePage('#create_summary_show_experience'),
  },
  {
    path: 'showEducation',
    next: '',
    alwaysOn: true,
    innerPath: 'showEducation',
    element: new ShowEducationPage('#create_summary_show_education'),
  },
  ...AddExperienceRoute,
  ...AddEducationRoute,
];

export default CreateSummaryRoutes;
