import { TEXT_ELEMENT } from '../typedefs'

/**
 * Creates new DomElement
 * @param {string} text - text to be shown
 * @return {Object} JssssKit object of TEXT_ELEMENT type
 */
const createTextElement = (text) => ({
  type: TEXT_ELEMENT,
  props: {
    nodeValue: text,
    children: []
  },
})


/**
 * Creates new JssssKit Element
 * @param {Object, string, function} type - Component Type.
 * String is used for domElements
 * Function - for functional components
 * Object - for other components
 * @return {Object} JssssKit object of TEXT_ELEMENT type
 */
const createElement = (type, props, ...children) =>({
  type,
  props: {
    ...props,
    children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
    )
  },
})

export {
  createElement,
}