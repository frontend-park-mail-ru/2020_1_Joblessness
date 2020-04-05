import {Page} from '../../../Page';
import template from './pug/index2.pug';
import {
  request,
  currentSession,
  uuid,
  withForm,
  validators, requestManager
} from '../../../ulils';

/**
 * select first and last names page
 */
class SecondStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}
SecondStep = withForm(SecondStep, {
    name: {
      id: uuid(),
      required: true,
      validator: (s) => s.length,
      warnMessage: 'Название компании не может быть пустой строкой',
    },
    site: {
      id: uuid(),
      validator: validators.isUrl,
      warnMessage: 'Укажите сайт компании или оставьте поле пустым',
    },
  },
  {
    id: uuid(),
  },
  (form, page) => {
    requestManager.tryChangeOrg(form)
      .then( (r) => {
        page.props.requestNext();
      })
      .catch( (r) => {
        console.log(r);
      });
  },
);

export {SecondStep};
