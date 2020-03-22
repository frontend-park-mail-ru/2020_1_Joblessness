import {uuid} from '../../../ulils';
import ExperienceItem from '../showExperience/ExperienceItem';
import {Navigator} from '../../../Navigator';
import {AddExperiencePage} from '../addExperience';
import {AtEditRoute} from './atEdit/AtEditRoute';
import {StartEditRoute} from './startEdit/StartEditRoute';

export const AddExperienceRoute = [
  {
    element: new AddExperiencePage('#create_summary_add_experience'),
    path: 'addExperience',
    alwaysOn: true,
    next: '',
    innerNext: 'showExperience',
    innerPath: 'addExperience',
  },
  StartEditRoute,
  AtEditRoute,
];
