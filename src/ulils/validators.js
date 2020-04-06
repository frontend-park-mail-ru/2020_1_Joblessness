/**
 * Validation wrapper
 * @param {function} compare - comporator
 * @param {string} msg - error message
 * @return {Function}
 */
const validateXXX = (compare, msg) => {
  return (prop, propName, throwError) => {
    if (compare(prop)) return true;

    if (!throwError) return false;

    throw new Error(`
        Expected variable ${propName} of type ${msg}, received ${typeof prop}
        `);
  };
};
// validate string, throw error if necessary
const validateString = validateXXX(
    (s) => typeof s === 'string', 'String');
// validate function, throw error if necessary
const validateFunction = validateXXX(
    (s) => typeof s === 'function', 'Function');

// Начинается с заглавной русской буквы, содержит хотя бы 2 буквы
const isSlavicName = (name) => /[A-ЯЁ][а-яё]/.test(name);
// 0 - 11
const isMonthId = (n) => 0 <= parseInt(n) && parseInt(n) <= 11;
// 0 - 31
const isDay = (n) => 0 <= parseInt(n) && parseInt(n) <= 31;
// 1900 - нынешний год
const isYear = (n) =>
  1900 <= parseInt(n) && parseInt(n) <= new Date().getFullYear();
// https://stackoverflow.com/questions/19605150/regex-for-password-mu
// st-contain-at-least-eight-characters-at-least-one-number-a
// Minimum eight characters, at least one letter and one number:
const isPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
// Удовлетворяет почти любому формату ввода телефона
const isPhoneNumber = (phone) =>
  /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone);
// Несложная валидация почты
const isEmail = (email) =>
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email);

const isDomElement = (e) => e instanceof HTMLElement;
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
  /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-_]{5,19}$/.test(login);

const isMoney = (money) => !isNaN(money) && money !== '';
const isUrl = (url) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);

const isName = (name) => /^[a-zA-Zа-яА-ЯёЁ]+(([',. -][a-zA-Zа-яА-ЯёЁ])?[a-zA-Zа-яА-ЯёЁ]*)*$/.test(name);
export default {
  validateString,
  validateFunction,
  isMonthId,
  isYear,
  isDay,
  isSlavicName,
  isPassword,
  isPhoneNumber,
  isEmail,
  isDomElement,
  hasId,
  isString,
  isBody,
  isMoney,
  isLogin,
  isFunction,
  isName,
  isUrl,
};

export {
  validateString,
  validateFunction,
  isMonthId,
  isYear,
  isDay,
  isSlavicName,
  isPassword,
  isPhoneNumber,
  isEmail,
  isDomElement,
  hasId,
  isName,
  isString,
  isBody,
  isMoney,
  isFunction,
  isLogin,
  isUrl,
};
