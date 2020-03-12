import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug'
import {uuid, withForm} from '../../../ulils';

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
    experienceFrom: {
      id: uuid(),
      required: true,
      // inputValidator: () => {
      //
      // }
    },
    experienceTo: {
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
//   companyName: "a"
// role: "a"
// experienceFrom: "1"
// experienceTo: "2"
// responsibilities: "1"
  (e, page) => {
    console.log(e, page)
    page.props.requestNext({
      companyName: e.companyName,
      role: e.role,
      experience: [e.experienceFrom, e.experienceTo],
      responsibilities: e.responsibilities,
    });
  },
);
export {
  AddExperiencePage
}