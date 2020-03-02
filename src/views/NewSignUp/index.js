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
  onClick = () => {
    Navigator.showPage('signup/employee/first-step')
  };
  render() {
    const currentStp = window.location.pathname;
    return template({
      ...this.props,
      step: currentStp,
      onClick: this.onClick,
    });
  }
}
const FirstStepI = new FirstStep('#_signup_steps');
const SecondStepI = new SecondStep('#_signup_steps');
const ThirdStepI = new ThirdStep('#_signup_steps');
const ForthStepI = new ForthStep('#_signup_steps');
const FifthStepI = new FifthStep('#_signup_steps');
NewSignUp = withChainedPages(NewSignUp, [
  FirstStepI,
  SecondStepI,
  ThirdStepI,
  ForthStepI,
  FifthStepI,
], () => {});
export {
  NewSignUp,
  FirstStepI,
  SecondStepI,
  ThirdStepI,
  ForthStepI,
  FifthStepI,
};
