import './style.sass';
import './auth-elements.sass';
import {Page} from '../../Page';
import template from './pug/index1.pug';
import {uuid, withEvents} from '../../ulils';

/**
 * Fancy page
 */
class FirstStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

FirstStep = withEvents(FirstStep, 'events',
    {
      submit: {
        id: uuid(),
        eventName: 'click',
        event: (e, page) => {
          page.props.requestNext(e);
        },
      },
    });
export {FirstStep};
