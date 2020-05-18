import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index4.pug';
import {
  requestManager,
  uuid,
  validators,
  withEvents,
  withForm,
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
    warnMessage: 'Tag состоит из латинских букв и цифр, а также "_" и "." Длина логина не менее 6 и не более 20',
    update: (e,v) => {
      return v.trim();
    },
  },
},
{
  id: uuid(),
},
(form, page) => {
  requestManager.tryChangePerson(form)
      .then(
          () => page.props.requestNext(form),
      )
      .catch(() => alert('Тег уже существует'));
},
);

export {ForthStep};
