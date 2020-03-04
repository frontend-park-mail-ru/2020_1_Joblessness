import {Navigator} from '../Navigator';

/**
 * Allows to quickly navigate between child pages
 * Subpages may be chained like 1st -> 2nd -> 3rd -> ...
 *                 go backwards ... -> 3rd -> 2nd -> 1st
 * Or can be shown in any order you want
 * @param {Page}Wrappee
 * @param {[{next:string, prev:string, element:Page}]}pages
 * @param {null|function}updateProps
 * @param {string}root - base url
 * @return {Page}
 */
export const withChainedPages = (Wrappee, pages,
    updateProps = null, root = '') => {
  /**
   * Wrapped page component
   */
  return class extends Wrappee {
    /**
     * append requestNext and requestPrevious to subPages
     * @param {HTMLAnchorElement|string}props
     */
    constructor(props) {
      super(props);

      const requestNext = (path, args) => {
        Navigator.showPage(root + path);
      };
      const requestPrevious = (path, args) => {
        Navigator.showPage(root + path);
      };

      pages.forEach((p) => {
        p.element.props.requestNext =
          (...a) => requestNext(p.next, ...a);
        p.element.props.requesPrevious =
          (...a) => requestPrevious(p.prev, ...a);
      });
    }

    componentWillUpdate = () => {
      updateProps && updateProps(this);

      super.componentWillUpdate && super.componentWillUpdate();
    }
  };
};
