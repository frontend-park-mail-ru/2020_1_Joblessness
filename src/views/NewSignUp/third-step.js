import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index3.pug'
import {uuid, withEvents, withForm} from '../../ulils';
import {SecondStep} from './second-step';

class ThirdStep extends Page {

  render() {
    return template(this.props);
  }
}
ThirdStep = withForm(ThirdStep, {},
  {},
  () => {
  },
  () => {

  });
ThirdStep = withEvents(ThirdStep, 'events',
  {
    submit: {
      id: uuid(),
      eventName: 'click',
      event: (e, page) => {
        page.props.requestNext(e)
      }
    }
  });

export {ThirdStep};
