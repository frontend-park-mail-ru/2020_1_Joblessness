import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index2.pug'
import {uuid, withEvents, withForm} from '../../ulils';

class SecondStep extends Page {

  render() {
    return template(this.props);
  }
}

SecondStep = withForm(SecondStep, {},
  {},
  () => {
  },
  () => {

  });
SecondStep = withEvents(SecondStep, 'events',
  {
    submit: {
      id: uuid(),
      eventName: 'click',
      event: (e, page) => {
        page.props.requestNext(e)
      }
    }
  });

export {SecondStep};
