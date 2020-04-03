import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index5.pug';
import {uuid, withEvents, withForm} from '../../../ulils';

/**
 * Prompt subpage
 */
class FifthStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

FifthStep = withForm(FifthStep, {},
    {},
    () => {
    },
    () => {

    });
FifthStep = withEvents(FifthStep, 'events',
    {
      submit: {
        id: uuid(),
        eventName: 'click',
        event: (e, page) => {
          page.props.requestNext(e);
        },
      },
    });

export {FifthStep};
