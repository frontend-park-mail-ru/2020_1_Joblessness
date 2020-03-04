import './style.sass';
import './auth-elements.sass';
import {Page} from '../../Page';
import template from './pug/index.pug';
import {withChainedPages} from '../../ulils';

import {FirstStep} from './first-step';
import {SecondStep} from './second-step';
import {ThirdStep} from './third-step';
import {ForthStep} from './forth-step';
import {FifthStep} from './fifth-step';

/**
 * Auth Page
 * Sub Pages:
 * FirstStep (fancy page)
 * SecondStep (sign in or sign up)
 * ThirdStep (choose first and last names)
 * ForthStep (choose Tag)
 * FifthStep (prompt)
 */
class NewSignUp extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

const AuthSubRoutes = [
  {
    path: '^$|/',
    next: 'signup/start',
    prev: 'signup/',
    element: new FirstStep('#_signup_steps'),
  },
  {
    path: 'start',
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
];
NewSignUp = withChainedPages(NewSignUp, AuthSubRoutes, (page) => {
  const step = window.location.pathname.split('/');

  switch (step[step.length - 1]) {
    case '':
    case 'signup':
    case 'employer':
    case 'next':
      page.props.currentStep = 1;
      break;
    default:
      page.props.currentStep = 2;
      break;
  }
},
);
export {
  NewSignUp,
  AuthSubRoutes,
};
