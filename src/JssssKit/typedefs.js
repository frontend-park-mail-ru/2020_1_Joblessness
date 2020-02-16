// Constants
//@TODO replace with Symbols
const TEXT_ELEMENT = 'TEXT_ELEMENT';
const UPDATE = 'UPDATE';
const DELETION = 'DELETION';
const PLACEMENT = 'PLACEMENT';
// Validators
const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isNew = (prev, next, key) => prev[key] !== next[key];
const isGone = (prev, next, key) => !(key in next);
const isNewOrGone = (prev, next, key) => isNew(prev, next, key) || isGone(prev, next, key);
// Export
export {
    TEXT_ELEMENT,
    UPDATE,
    DELETION,
    PLACEMENT,
    isEvent,
    isProperty,
    isNew,
    isGone,
    isNewOrGone
}