const validateString = (prop, propName = '', throwError = false) => {
    if (typeof prop === 'string') {
        return true;
    }
    if (!throwError) {
        return false;
    }
    throw new Error(`Expected variable ${propName} of type String, received ${typeof prop}`)
};

const validateFunction = (prop, propName = '', throwError = false) => {
    if (typeof prop === 'function') {
        return true
    }
    if (!throwError) {
        return false
    }
    throw new Error(`Expected variable ${propName} of type Function, received ${typeof prop}`)
};

const isSlavicName = name => /[A-ЯЁ][а-яё]/.test(name);
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
// Minimum eight characters, at least one letter and one number:
const isPassword = password => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
const isPhoneNumber = phone => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone);
const isEmail = email => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);
export {
    validateString,
    validateFunction,
    isSlavicName,
    isPassword,
    isPhoneNumber,
    isEmail
}