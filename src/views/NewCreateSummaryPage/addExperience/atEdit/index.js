import './style.sass';
import {Page} from '../../../../Page';
import template from './index.pug';
import {uuid, withForm} from '../../../../ulils';
import withLocalStore from '../../localStore';

/**
 * Add experience subpage
 */
class AtEditPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}
AtEditPage = withLocalStore(AtEditPage);


AtEditPage = withForm(AtEditPage, {
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
  },
}, {
  id: uuid(),
},
(e, page) => {

  const exp = {
    companyName: e.companyName,
    role: e.role,
    experience: [e.experienceFrom, e.experienceTo],
    responsibilities: e.responsibilities,
  };

  page.props.setStore(
      (s) => ({
        experience: [
          ...s.experience,
          exp,
        ],
      }),
  );
  const start = document.getElementById('add_experience_start_edit');
  const at = document.getElementById('add_experience_at_edit');
  start.classList.add('shown');
  start.classList.remove('hidden');
  at.classList.remove('shown');
  at.classList.add('hidden');

  page.props.requestNext(exp);
},
);

export {
  AtEditPage,
};
