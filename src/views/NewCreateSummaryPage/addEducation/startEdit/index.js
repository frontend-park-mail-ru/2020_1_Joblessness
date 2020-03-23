import './style.sass';
import {Page} from '../../../../Page';
import template from './index.pug';
import {uuid, withForm} from '../../../../ulils';

/**
 * Add experience subpage
 */
class StartEditPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
}

StartEditPage = withForm(StartEditPage, {}, {id: uuid()},
    (arg, page, e, id) => {
      const start = document.getElementById('add_education_start_edit');
      const at = document.getElementById('add_education_at_edit');

      start.classList.remove('shown');
      start.classList.add('will-remove');
      at.classList.add('shown');

      setTimeout(()=> {
        start.classList.add('hidden');
        start.classList.remove('will-remove');
      }, 200);

      at.classList.remove('hidden');
    // page.props.requestNext();
    },
);
export {
  StartEditPage,
};
