import { isEvent, isNew, isProperty, isGone, isNewOrGone } from '../typedefs'

/**
 * Compares props and removes outdated Events
 * @param {HTMLElement} dom - Element to update
 * @param {Object} prevProps - Previous element props
 * @param {Object} nextProps - Current element props
 */
const removeOldEventListeners = (dom, prevProps, nextProps) => {
  Object.keys(prevProps)
    .filter(key => (
      isEvent(key) && isNewOrGone(prevProps, nextProps, key) ) )
    .forEach(
      name => dom.removeEventListener(
        name.toLowerCase().substring(2), prevProps[name]
      )
    );
}
/**
 * Compares props and removes outdated properties
 * @param {HTMLElement} dom - Element to update
 * @param {Object} prevProps - Previous element props
 * @param {Object} nextProps - Current element props
 */
const removeOldProperties = (dom, prevProps, nextProps) => {
  //
  Object.keys(prevProps)
    .filter( key => isProperty(key) && isGone(prevProps, nextProps, key))
    .forEach(name => dom[name] = "");
}

const setNewProperties = (dom, prevProps, nextProps) => {
  Object.keys(nextProps)
    .filter( key => isProperty(key) && isNew(prevProps, nextProps, key))
    .forEach( name => dom[name] = nextProps[name])
}

const setNewEventListeners = (dom, prevProps, nextProps) => {
  Object.keys(nextProps)
    .filter( key => isEvent(key) && isNew(prevProps, nextProps, key))
    .forEach(name => dom.addEventListener(
      name.toLowerCase().substring(2), nextProps[name]
    ));
}

const updateDom = (dom, prevProps, nextProps) => {
  //Remove old or changed event listeners
  removeOldEventListeners(dom, prevProps, nextProps)
  // Remove old properties
  removeOldProperties(dom, prevProps, nextProps)
  // Set new or changed properties
  setNewProperties(dom, prevProps, nextProps)
  // Add event listeners
  setNewEventListeners(dom, prevProps, nextProps)
}

export {
  removeOldProperties,
  removeOldEventListeners,
  setNewEventListeners,
  setNewProperties,
  updateDom
}