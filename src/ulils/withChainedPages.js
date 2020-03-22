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

      this._appendRequestNextAndPrevious();
      this.props.insertSubPage = (page) => {
        pages.push(page);
      };
    }
    _appendRequestNextAndPrevious = () => {
      const requestNext = (page, pageElem, path, args) => {
        page.beforeNext && page.beforeNext(pageElem, ...args);
        Navigator.showPage(root + path, !page.useInner);
        page.afterNext && page.afterNext(pageElem, ...args);
      };
      const requestPrevious = (page, pageElem, path, args) => {
        page.beforePrevious && page.beforePrevious(pageElem, ...args);
        Navigator.showPage(root + path, !page.useInner);
        page.afterPrevious && page.afterPrevious(pageElem, ...args);
      };
      pages.forEach((p) => {
        p.element.props.requestNext =
          (...a) => {
            const nextPath = p.innerNext ? p.innerNext : p.next;
            const nextPage = pages.find((p) => p.innerPath === nextPath) ?? p;
            requestNext(p, nextPage?.element, p.next, a);
          };
        p.element.props.requestPrevious =
          (...a) => {
            const prevPath = p.innerPrev ? p.innerPrev : p.prev;
            const nextPage = pages.find((p) => p.innerPath === prevPath) ?? p;
            requestPrevious(p, nextPage?.element, p.next, a);
          };
      });
    };
    componentWillUpdate = () => {
      updateProps && updateProps(this);

      super.componentWillUpdate && super.componentWillUpdate();
    }
  };
};
