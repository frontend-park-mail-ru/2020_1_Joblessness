import {Navigator} from '../Navigator';

export const withChainedPages = (Wrappee, pages, updateProps = null, root = '') => {

  return class extends Wrappee {

    constructor(props) {
      super(props);
      const requestNext = (path, args) => {
        // console.log(e);
        // ++this.props.currentStep;
        Navigator.showPage(root + path)
      };
      const requestPrevious = (path, args) => {
        // console.log(e);
        // --this.props.currentStep;
        Navigator.showPage(root + path)
      };

      pages.forEach(p => {
        p.element.props.requestNext =
          (...a) => requestNext(p.next, ...a);
        p.element.props.requesPrevious =
          (...a) => requestPrevious(p.prev, ...a);
      });

    }

    componentWillUpdate = () => {
      updateProps && updateProps(this);

      super.componentWillUpdate && super.componentWillUpdate()
    }
  }
};