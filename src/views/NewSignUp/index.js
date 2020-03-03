import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index.pug'
import {Navigator} from '../../Navigator';
import {withChainedPages} from './ChainedPages';
import {FirstStep} from './first-step';
import {SecondStep} from './second-step';
import {ThirdStep} from './third-step';
import {ForthStep} from './forth-step';
import {FifthStep} from './fifth-step';
class NewSignUp extends Page {

  constructor(props) {
    super(props);
  }

  render() {
    return template(this.props);
  }
}
const FirstStepI = new FirstStep('#_signup_steps');
const SecondStepI = new SecondStep('#_signup_steps');
const ThirdStepI = new ThirdStep('#_signup_steps');
const ForthStepI = new ForthStep('#_signup_steps');
const FifthStepI = new FifthStep('#_signup_steps');
NewSignUp = withChainedPages(NewSignUp, [
  {
    next: 'signup/start',
    prev: 'signup/',
    element: FirstStepI,
  },
  {
    next: 'signup/name',
    prev: 'signup/',
    element: SecondStepI,
  },
  {
    next: 'signup/tag',
    prev: 'signup/start',
    element: ThirdStepI,
  },
  {
    next: 'signup/next',
    prev: 'signup/name',
    element: ForthStepI,
  },
  {
    next: '/summaries/create',
    prev: 'signup/tag',
    element: FifthStepI,
  }
], (page) => {
  const step = window.location.pathname.split('/');

  switch (step[step.length - 1]) {
    case '':
    case 'signup':
    case 'next':
      page.props.currentStep = 1; break;
    default:
      page.props.currentStep = 2; break;
  }
});
export {
  NewSignUp,
  FirstStepI,
  SecondStepI,
  ThirdStepI,
  ForthStepI,
  FifthStepI,
};
