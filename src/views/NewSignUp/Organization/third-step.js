import {Page} from '../../../Page';
import template from './pug/index3.pug';
import {
  requestManager,
  uuid,
  validators,
  withForm,
} from '../../../ulils';

/**
 * Choose tag subpage
 */
class ThirdStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}
ThirdStep= withForm(ThirdStep, {
  tag: {
    id: uuid(),
    required: true,
    validator: validators.isLogin,
    warnMessage: 'Tag состоит из минимум 6 символов, в том числе из цифр, ' +
        'латинских букв, а также символов _ и .',
  },
},
{
  id: uuid(),
},
(form, page) => {
  requestManager.tryChangeOrg(form)
      .then(
          () => page.props.requestNext(form),
      )
      .catch(() => alert('Тег уже существует'));
},
);

export {ThirdStep};
