import './style.sass';
import './auth-elements.sass';
import {Page} from '../../Page';
import template from './pug/index4.pug';
import {uuid, withEvents, withForm} from '../../ulils';

/**
 * Choose tag subpage
 */
class ForthStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}
ForthStep= withForm(ForthStep, {},
    {},
    () => {
    },
    () => {

    });
ForthStep = withEvents(ForthStep, 'events',
    {
      submit: {
        id: uuid(),
        eventName: 'click',
        event: (e, page) => {
          page.props.requestNext(e);
        },
      },
    });

export {ForthStep};
