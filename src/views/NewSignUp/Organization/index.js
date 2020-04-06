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

  componentWillUpdate() {
    super.componentWillUpdate();
    const step = window.location.pathname.split('/');
    if (step[step.length - 1] === '') {
      step.pop();
    }
    switch (step[step.length - 1]) {
      case 'signup':
        this.currentStep = 0;
        break;
      case 'name':
        this.currentStep = 1;
        break;
      case 'tag':
        this.currentStep = 2;
        break;
      case 'next':
        this.currentStep = 3;
        break;
      default:
        this.currentStep = 0;
    }

    setTimeout(
        () => {
          const stepsHolder = document.querySelector('.step-counter');
          const elems = document.querySelectorAll(
              '.step-counter--counter.current');
          if (elems.length) {
            Array.from(elems).forEach(
                (e) => e.classList.remove('current'),
            );
          }
        stepsHolder
          ?.childNodes[this.currentStep * 2]
          ?.classList.add('current');
        for (let c = 0; c <= this.currentStep; c++) {
          stepsHolder
            ?.childNodes[c * 2]
            ?.classList.remove('locked');
        }
        }, 20);
  }
}

NewSignUp = withChainedPages(NewSignUp, SubRoutes);

export {
  NewSignUp,
};
