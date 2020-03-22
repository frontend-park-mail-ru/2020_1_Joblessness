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
    institution: {
      id: uuid(),
      eventName: 'click',
      required: true,
    },
    speciality: {
      id: uuid(),
      eventName: 'click',
      required: true,
    },
    graduated: {
      id: uuid(),
      eventName: 'click',
      required: true,
    },
    type: {
      id: uuid(),
      eventName: 'click',
      required: true,
    },
  },
  {
    id: uuid(),
  },
  (e, page) => {
    console.log(e, page);
    const edu = {
      institution: e.institution,
      speciality: e.speciality,
      graduated: e.graduated,
      type: e.type,
    };

    page.props.setStore(
      (s) => ({
        education: [
          ...s.education,
          edu,
        ],
      }),
    );
    const start = document.getElementById('add_education_start_edit');
    const at = document.getElementById('add_education_at_edit');
    start.classList.add('shown');
    start.classList.remove('hidden');
    at.classList.remove('shown');
    at.classList.add('hidden');

    page.props.requestNext(edu);
  },
);

export {
  AtEditPage,
};
