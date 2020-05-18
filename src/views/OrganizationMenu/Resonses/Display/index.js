import {Page} from '../../../../Page';
import './style.sass';
import template from './index.pug';
import withLocalStore from '../../localStore';
import {uuid} from '../../../../ulils';

class Display extends Page {
  componentWillUpdate() {
    super.componentWillUpdate();
    // this.props.needUpdate()
  }

  render() {
    return template({
      ...this.props,
      items: this.props.getStore().responses,
    });
  }
}

Display = withLocalStore(Display, {
  updateDisplay: (page, oldS, newS) => {
    if(oldS.currentPage !== newS.currentPage &&
      newS.currentPage === 'responses') {
      page.props.random = uuid();
    }
  }
});
export {
  Display,
};
