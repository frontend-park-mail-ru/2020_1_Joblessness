const validateXXX = (compare, msg) => {
  return (prop, propName, throwError) => {
    if (compare(prop)) return true;

    if (!throwError) return false;

    throw new Error(`
        Expected variable ${propName} of type ${msg}, received ${typeof prop}
        `);
  };
};

const validateString = validateXXX(
    (s) => typeof s === 'string', 'String');
const validateFunction = validateXXX(
    (s) => typeof s === 'function', 'Function');

const isSlavicName = (name) => /[A-ЯЁ][а-яё]/.test(name);
// https://stackoverflow.com/questions/19605150/regex-for-password-mu
// st-contain-at-least-eight-characters-at-least-one-number-a
// Minimum eight characters, at least one letter and one number:
const isPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
const isPhoneNumber = (phone) =>
  /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone);
const isEmail = (email) =>
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);

const isDomElement = (e) => e instanceof HTMLAnchorElement;
const hasId = (e) => e.id;
const isBody = (e) => e === document.body;
const isString = (s) => typeof s === 'string';
const isFunction = (f) => typeof f === 'function';
/*
https://stackoverflow.com/a/28555166/11503488
(?=.*[A-Za-z0-9]$) Asserts that the match must ends with a letter or digit.
[A-Za-z] Must starts with a letter.
[A-Za-z\d.-]{0,19} matches the chars according
to the pattern present inside the char class.
And the number of matched chars must be from 0 to 19.
 */
const isLogin = (login) =>
  /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{5,19}$/.test(login);
export default {
  validateString,
  validateFunction,
  isSlavicName,
  isPassword,
  isPhoneNumber,
  isEmail,
  isDomElement,
  hasId,
  isString,
  isBody,
  isLogin,
  isFunction,
};

export {
  validateString,
  validateFunction,
  isSlavicName,
  isPassword,
  isPhoneNumber,
  isEmail,
  isDomElement,
  hasId,
  isString,
  isBody,
  isFunction,
  isLogin,
};
