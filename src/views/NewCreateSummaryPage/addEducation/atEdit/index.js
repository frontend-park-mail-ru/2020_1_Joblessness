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


// AtEditPage = withForm(AtEditPage, {}, {
//   id: uuid(),
// },
// () => {
//
//   const start = document.getElementById('add_education_start_edit');
//   const at = document.getElementById('add_education_at_edit');
//   start.classList.add('shown');
//   start.classList.remove('hidden');
//   at.classList.remove('shown');
//   at.classList.add('hidden');
//   page.props.requestNext(exp);
// },
// );

export {
  AtEditPage,
};
