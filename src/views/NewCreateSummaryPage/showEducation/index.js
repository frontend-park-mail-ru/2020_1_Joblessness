import './style.sass';
import {Page} from '../../../Page';
import template from './index.pug';
import {withChainedPages} from '../../../ulils';
import {Navigator} from '../../../Navigator';
import {withLocalStore} from '../localStore';
import {moveDownEvent, moveUpEvent} from '../events';

/**
 * SubPage for displaying person's education
 */
class ShowEducationPage extends Page {
  /**
   * @return{string}
   */
  render() {
    return template(this.props);
  }
  /**
   * remove, edit, move up or down events for sub pages
   */
  componentDidMount() {
    super.componentDidMount?.();
    this.props.eduList
      ?.forEach( (e) => addEvents(this,
        document.getElementById(e.id).parentNode, e.id));
  }
}
const addEvents = (page, elem, id) => {
  const remove = elem.getElementsByClassName('remove-button')[0];
  const moveDown = elem.getElementsByClassName('move-down')[0];
  const moveUp = elem.getElementsByClassName('move-up')[0];

  addRemoveEvent(page, remove, id, elem);
  moveDownEvent(page, moveDown, id, 'eduList');
  moveUpEvent(page, moveUp, id, 'eduList');
};

const addRemoveEvent = (page, elem, id, elemToRemove) => {
  const removeEvent = () => {
    elem?.removeEventListener('click', removeEvent);
    page.props.expList = page.props.expList.filter((e) => e.id !== id);

    elemToRemove.classList.add('removing');
    setTimeout(() => elemToRemove.remove(), 500);
    Navigator.removeRoutes([{
      path: 'summaries/create',
      childRoutes: [
        {
          path: 'showEducation',
          childRoutes: [{
            path: id,
          }],
        },
      ],
    }]);
  };
  elem?.addEventListener('click', removeEvent);
};

const showEducationRoutes = [];
ShowEducationPage = withLocalStore(ShowEducationPage);

ShowEducationPage = withChainedPages(ShowEducationPage, showEducationRoutes,
  null, '/summaries/create/showEducation/');
export {
  ShowEducationPage,
};
