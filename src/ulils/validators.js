const validateString = (prop, propName="", throwError = false) => {
    if( typeof prop === 'string' ) {
        return true;
    }
    if( !throwError ) {
        return false;
    }
    throw new Error(`Expected variable ${propName} of type String, received ${typeof prop}`)
};
export default {
    validateString
}