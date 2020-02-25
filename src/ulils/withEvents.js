/**
 * Easy way to add events on page
 * @constructor
 * @param {Page} WrappedComponent - Instance of Page - component to apply
 * @param {string} propName - reserved property name in props to store events.
 * @param {Object} events - Object in shape:
 * {
 *     eventName1 : {
 *         id: "domElementId1",
 *         eventName: "click|chage|...",
 *         event: function(e, page) - e stands for event,
 *         page - for wrapped component
 *     },
 *     eventName2 : {
 *         id: "domElementI21",
 *         eventName: "click|chage|...",
 *         event: function(e, page) page is usualy used for requestRender().
 *     },
 * }
 * Example presented in UserPage component
 */
export const withEvents = (WrappedComponent, propName, events) => {
  if ( WrappedComponent && !WrappedComponent.isPageComponent ) {
    throw new Error(`
        WrappedComponent in withEvents function must inherit from Page
        `);
  }

  /**
   * wrapper
   */
  return class extends WrappedComponent {
    /**
     * set props
     * @param {any}args
     */
    constructor(...args) {
      super(...args);
      this.props[propName] = events;
    }

    /**
     * overwrites componentDidMount Method!
     */
    componentDidMount = () => {
      super.componentDidMount && super.componentDidMount();
      Object.keys(events).map((e) => {
        const dom = document.getElementById(events[e].id);
        if (!dom) {
          throw new Error(`
                    There are no dom element with id ${events[e].id}. 
                    You must have forgotten to add it to the page`);
        }
        dom.addEventListener(events[e].eventName, async (ev) => {
          await events[e].event(ev, this);
        });
      });
    }
  };
};
