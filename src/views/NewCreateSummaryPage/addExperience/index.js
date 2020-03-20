import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug'
import {uuid, withForm} from '../../../ulils';

class AddExperiencePage extends Page {
  render() {
    return template(this.props)
  }
  componentDidMount() {
    console.log('did mount');
    this.props.requestNext({
      companyName: 'Mail',
      role: 'впавап',
      experience: ['2000','2020'],
      responsibilities: 'пить, петь, есть'
    });
    this.props.requestNext({
      companyName: 'Maisfl',
      role: 'впавап',
      experience: ['2000','2020'],
      responsibilities: 'пить, петь, есть'
    });
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
    },
    experienceTo: {
      id: uuid(),
      required: true,
    },
    responsibilities: {
      id: uuid(),
      required: true,
    }
  }, {
    id: uuid(),
  },
  (e, page) => {
    console.log(e, page);
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