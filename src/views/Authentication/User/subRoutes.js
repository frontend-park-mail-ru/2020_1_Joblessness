import {SecondStep} from './second-step';
import {ThirdStep} from './third-step';
import {ForthStep} from './forth-step';
import {FifthStep} from './fifth-step';
import NAVIGATION_ROUTES from '../../Navigation/routes';

const SubRoutes = [
  ...NAVIGATION_ROUTES,
  {
    path: '^$|^/{1}$',
    next: 'signup/name',
    prev: 'signup/',
    element: new SecondStep('#_signup_steps'),
  },
  {
    path: 'name',
    next: 'signup/tag',
    prev: 'signup/start',
    element: new ThirdStep('#_signup_steps'),
  },
  {
    path: 'tag',
    next: 'signup/next',
    prev: 'signup/name',
    element: new ForthStep('#_signup_steps'),
  },
  {
    path: 'next',
    next: '/summaries/create',
    prev: 'signup/tag',
    element: new FifthStep('#_signup_steps'),
  },
  {
    path: 'any',
    next: 'signup/name',
    prev: 'signup/',
    element: new SecondStep('#_signup_steps'),
  },
];

export default SubRoutes;
