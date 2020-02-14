import { TEXT_ELEMENT } from '../typedefs'

/**
 * Creates new DomElement
 * @param {string} text - text to be shown
 * @return {Object} JssssKit object of TEXT_ELEMENT type
 */
const createTextElement = (text) => {
  const object = {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
    },
  }
  // Object.freeze(object)
  return object
}


/**
 * Creates new JssssKit Element
 * @param {Object, string, function} type - Component Type.
 * String is used for domElements
 * Function - for functional components
 * Object - for other components
 * @return {Object} JssssKit object of TEXT_ELEMENT type
 */
const createElement = (type, props, ...children) =>{
  const newChildren = [
    ...(props ? props.children ? props.children : []: []),
    ...children.map(child =>
    typeof child === "object" ? child : createTextElement(child)
  )
  ]
  return {
    type,
    props : {
      ...props,
      children : newChildren,
    },
  }
}

export {
  createElement,
}