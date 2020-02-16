import {updateDom} from '../UpdateDom';
import {TEXT_ELEMENT} from '../typedefs';

/**
 * Creates new DomElement
 * @param {Object} fiber - JssssKit Element
 * @return {HTMLElement, Text} dom element
 */
const createDom = fiber => {
    // Create Component or Null(Text) element
    const dom = fiber.type === TEXT_ELEMENT ?
        document.createTextNode("") :
        document.createElement(fiber.type);
    // Set events and other props
    updateDom(dom, {}, fiber.props);
    // Return it
    return dom;
};

export {
    createDom
};