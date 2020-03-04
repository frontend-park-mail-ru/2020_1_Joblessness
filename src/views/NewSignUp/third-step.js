import './style.sass'
import './auth-elements.sass'
import {Page} from '../../Page';
import template from './pug/index3.pug'
import {request, currentSession, uuid, withEvents, withForm} from '../../ulils';
import {SecondStep} from './second-step';
import {isLogin, isPassword} from '../../ulils/validators';
import {Navigator} from '../../Navigator';

class ThirdStep extends Page {

  render() {
    return template(this.props);
  }
}
ThirdStep = withForm(ThirdStep, {
    firstName: {
      id: uuid(),
      required: true,
      validator: (s) => s.length,
      warnMessage: 'Имя не может быть пустой строкой'
    },
    lastName: {
      id: uuid(),
      required: true,
      validator: (s) => s.length,
      warnMessage: 'Фамилия - тоже'
    }
  },
  {
    id: uuid(),
  },
  (form, page) => {
    request.post(`/api/user/${currentSession.user.id}`, {
      'first-name' : form.firstName,
      'last-name' : form.lastName,
    })
      .then( r => {
        page.props.requestNext()
      })
      .catch( r => {
        console.log(r)
      })
  }
);

export {ThirdStep};
