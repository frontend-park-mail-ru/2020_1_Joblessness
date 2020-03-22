import {StartEditPage} from './index';

export const StartEditRoute = {
  element: new StartEditPage('#add_education_start_edit'),
  path: 'any',
  useInner: true,
  next: 'atEdit'
};
