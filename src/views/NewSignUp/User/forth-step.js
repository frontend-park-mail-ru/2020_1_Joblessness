import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index4.pug';
import {
  requestManager,
  uuid,
  validators,
  withEvents,
  withForm
} from '../../../ulils';

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
ForthStep= withForm(ForthStep, {
    tag: {
      id: uuid(),
      required: true,
      validator: validators.isLogin,
      warnMessage: 'Tag состоит из минимум 6 символов, в том числе из цифр, латинских букв, а также символов _ и .',
    }
  },
  {
      id: uuid(),
  },
  (form, page) => {
    requestManager.tryChangePerson(form)
      .then(
        () => page.props.requestNext(form)
      )
      .catch(() => alert('Тег уже существует'));
  },
);

export {ForthStep};
