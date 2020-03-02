import {Navigator} from '../../Navigator';

const withChainedPages = (Wrappee, pages, onSwap) => {

  return class extends Wrappee {
    constructor(props) {
      super(props);
      const requestNext = (e) => {
        console.log(e);
        Navigator.showPage('/signup/employee/second-step/')
      };
      pages.forEach( p => p.props.requestNext = requestNext);
    }
  }
};


export {
  withChainedPages,
}