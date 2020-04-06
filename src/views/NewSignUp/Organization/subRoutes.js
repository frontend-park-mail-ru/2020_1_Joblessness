import {FirstStep} from './first-step';
import {SecondStep} from './second-step';
import {ThirdStep} from './third-step';
import {ForthStep} from './forth-step';

const SubRoutes = [
  {
    path: '^$|^/{1}$',
    next: 'name',
    prev: '',
    element: new FirstStep('#org_signup_holder'),
  },
  {
    path: 'name',
    next: 'tag',
    prev: '',
    element: new SecondStep('#org_signup_holder'),
  },
  {
    path: 'tag',
    next: 'next',
    prev: 'name',
    element: new ThirdStep('#org_signup_holder'),
  },
  {
    path: 'next',
    next: 'next',
    prev: 'tag',
    element: new ForthStep('#org_signup_holder'),
  },
  {
    path: 'any',
    next: 'name',
    prev: '',
    element: new FirstStep('#org_signup_holder'),
  },
];

export default SubRoutes;
