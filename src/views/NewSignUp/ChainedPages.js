import {Navigator} from '../../Navigator';

const withChainedPages = (Wrappee, pages, updateProps = null) => {

  return class extends Wrappee {

    constructor(props) {
      super(props);
      const requestNext = (path, args) => {
        // console.log(e);
        // ++this.props.currentStep;
        Navigator.showPage(path)
      };
      const requestPrevious = (path, args) => {
        // console.log(e);
        // --this.props.currentStep;
        Navigator.showPage(path)
      };

      pages.forEach(p => {
        p.element.props.requestNext =
          (...a) => requestNext(p.next, ...a);
        p.element.props.requesPrevious =
          (...a) => requestPrevious(p.prev, ...a);
      });

      console.log(pages)
    }

    componentWillUpdate = () => {
      updateProps && updateProps(this);

      super.componentWillUpdate && super.componentWillUpdate()
    }
  }
};


export {
  withChainedPages,
}