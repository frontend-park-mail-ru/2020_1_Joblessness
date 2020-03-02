import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index1.pug'
import {uuid, withEvents, withForm} from '../../ulils';

class FirstStep extends Page {

  parent = 'signup/employee';

  render() {
    return template(this.props);
  }
}

FirstStep = withForm(FirstStep, {},
  {},
  () => {
  },
  () => {

  });
FirstStep = withEvents(FirstStep, 'events',
  {
    submit: {
      id: uuid(),
      eventName: 'click',
      event: (e, page) => {
        page.props.requestNext(e)
      }
    }
  });
export {FirstStep};
