import './style.sass'
import {Page} from '../../../Page';
import template from './index.pug';
import {withChainedPages} from '../../../ulils';
import {Navigator} from '../../../Navigator';

class ShowExperiencePage extends Page {
  render() {
    console.log(this.props);
    return template(this.props);
  }
  componentDidMount() {
    super.componentDidMount?.();
    this.props.expList
      .forEach( e => addEvents(this,
        document.getElementById(e.id).parentNode, e.id))
  }
}
const addEvents = (page, elem, id) => {
  const remove = elem.getElementsByClassName('remove-button')[0];
  const moveDown = elem.getElementsByClassName('move-down')[0];
  const moveUp = elem.getElementsByClassName('move-up')[0];
  addRemoveEvent(page, remove, id, elem);
  moveDownEvent(page, moveDown, id);
  moveUpEvent(page, moveUp, id);
};
const addRemoveEvent = (page, elem, id, elemToRemove) => {
  const removeEvent = () => {
    elem?.removeEventListener('click', removeEvent)
    page.props.expList = page.props.expList.filter(e => e.id !== id);
    console.log(page.props.expList);
    elemToRemove.classList.add('removing');
    setTimeout(() => elemToRemove.remove(), 500);
    Navigator.removeRoutes([{
      path: 'summaries/create',
      childRoutes: [
        {
          path: 'showExperience',
          childRoutes: [{
            path : id
          }]
        }
      ]
    }])
  };
  elem?.addEventListener('click', removeEvent)
};
const moveDownEvent = (page, elem, id) => {
  const moveDownEvent = () => {
    for(let i = 0; i < page.props.expList.length - 1; i++) {
      if(page.props.expList[i].id === id) {
        const temp = page.props.expList[i];
        page.props.expList[i] = page.props.expList[i + 1];
        page.props.expList[i + 1] = temp;

        const el1 = document.getElementById(page.props.expList[i].id).parentNode;
        const el2 = document.getElementById(page.props.expList[i + 1].id).parentNode;
        el1.classList.add('moving-top');
        el2.classList.add('moving-down');
        setTimeout(
          () => {
            el1.parentNode.insertBefore(el1, el2);
            el1.classList.remove('moving-top');
            el2.classList.remove('moving-down');
          }, 200
        );
        return;
      }
    }
  };
  elem?.addEventListener('click', moveDownEvent)
};
const moveUpEvent = (page, elem, id) => {
  const moveUpEvent = () => {
    if( page.props.expList[0].id === id) {
      return;
    }

    for(let i = 1; i < page.props.expList.length; i++) {
      if(page.props.expList[i].id === id) {
        const temp = page.props.expList[i - 1];
        page.props.expList[i - 1] = page.props.expList[i];
        page.props.expList[i] = temp;

        const el1 = document.getElementById(page.props.expList[i - 1].id).parentNode;
        const el2 = document.getElementById(page.props.expList[i].id).parentNode;
        el1.classList.add('moving-top');
        el2.classList.add('moving-down');
        setTimeout(
          () => {
            el1.parentNode.insertBefore(el1, el2);
            el1.classList.remove('moving-top');
            el2.classList.remove('moving-down');
          }, 200
        );
        return;
      }
    }
  };
  elem?.addEventListener('click', moveUpEvent)
};
const showExperienceRoutes = [
];
ShowExperiencePage = withChainedPages(ShowExperiencePage, showExperienceRoutes,
  null, '/summaries/create/showExperience/');
export {
  ShowExperiencePage
}
