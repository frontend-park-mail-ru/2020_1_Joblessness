import './add-experience.sass'
import {Page} from '../../Page';
import template from './pug/addExperience.pug'
import {uuid, withForm} from '../../ulils';

class AddExperiencePage extends Page {
  render() {
    return template(this.props)
  }
}
AddExperiencePage = withForm(AddExperiencePage, {
  companyName: {
    id: uuid(),
    required: true,
  },
  role: {
    id: uuid(),
    required: true,
  },
  experience: {
    id: uuid(),
    required: true,
    // inputValidator: () => {
    //
    // }
  },
  responsibilities: {
    id: uuid(),
    required: true,
  }
  }, {
  id: uuid(),
},
  (e, page) => {
    console.log(e, page)
    page.props.requestNext({
      companyName: 'Mail.ru Group',
      role: 'Старший разработчик',
      experience: ['2010', 'нынешнее время'],
      responsibilities: 'devOps, рефакторинг, управление БД',
    });
  },
);
export {
  AddExperiencePage
}