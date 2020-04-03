import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index.pug';
import {withChainedPages} from '../../../ulils';

import SubRoutes from './subRoutes';
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

NewSignUp = withChainedPages(NewSignUp, SubRoutes, (page) => {
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
};
