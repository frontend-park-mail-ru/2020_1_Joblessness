import './style.sass';
import './auth-elements.sass';
import {Page} from '../../../Page';
import template from './pug/index3.pug';
import {
  request,
  currentSession,
  uuid,
  withForm,
  requestManager
} from '../../../ulils';

/**
 * select first and last names page
 */
class ThirdStep extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

ThirdStep = withForm(ThirdStep,
  {
    firstName: {
      id: uuid(),
      required: true,
      validator: (s) => s.length,
      warnMessage: 'Имя не может быть пустой строкой',
    },
    lastName: {
      id: uuid(),
      required: true,
      validator: (s) => s.length,
      warnMessage: 'Фамилия - тоже',
    },
  },
  {
    id: uuid(),
  },
  (form, page) => {
    requestManager.tryChangePerson(form)
      .then((r) => {
        page.props.requestNext();
      })
      .catch((r) => {
        console.log(r);
      });
  },
);

export {ThirdStep};
