import {validateString} from './validators';

/**
 * Добавляет поддержку валидации форм
 * @param {Page} WrappedComponent
 * @param {Object}inputFields
 * @param {Object}submitField
 * @param {function}onValid
 * @param {function}onInvalid
 * @param {string}propName
 * @return {Page}
 */
export const withForm = (WrappedComponent, inputFields, submitField,
    onValid, onInvalid = null, propName = 'inputFields') => {
  if (!WrappedComponent.isPageComponent) {
    throw new Error(`
        Expected Page component as WrappedComponent at withForm!
        `);
  }

  if (typeof inputFields !== 'object') {
    throw new Error(`
        Expected Object as inputFields at withForm!
        `);
  }

  if (typeof submitField !== 'object') {
    throw new Error(`
        Expected Object as submitField at withForm!
        `);
  }

  if (onInvalid !== null && typeof onInvalid !== 'function') {
    throw new Error(`
        Expected function as onInvalid property at withForm!
        `);
  }

  if (typeof propName !== 'string') {
    throw new Error(`
        Expected string as propName at withForm!
        `);
  }

  return class extends WrappedComponent {
    /**
       * call default constructor and set element's props
       * @param {any} args
       */
    constructor(args) {
      super(args);
      this.props[propName] = {
        ...inputFields,
        submitField,
      };
      // get number of required fields
      this.__expectedLength = Object
          .keys(inputFields)
          .map((k) => inputFields[k].required)
          .filter((e) => e)
          .length;
    }

    /**
       * append button after rendering
       */
    componentDidMount = () => {
      this.addSubmit();
    };

    /**
       * default warning
       * @param {HTMLAnchorElement} inputBlock
       * @param {string} warnMessage
       */
    showWarning = (inputBlock, warnMessage) => {
      const warnBlock = inputBlock.lastElementChild;
      warnBlock.textContent = warnMessage || 'Обязательное поле';
      const tid = setTimeout(
          () => {
            warnBlock.textContent = '';
          }, 10000,
      );
      /**
           * remove warning on click or after 10 sec
           */
      const removeWarn = () => {
        clearTimeout(tid);
        warnBlock.textContent = '';
        document.removeEventListener('click', removeWarn, true);
      };
      document.addEventListener('click', removeWarn, true);
    };

    /**
       * default input validator
       * @param {HTMLAnchorElement} inputBlock
       * @param {bool} required - if field is required
       * @param {function} validator - validate field data
       * @param {string} warnMessage message on warn
       * @param {string} key field name in inputFields object
       * @return {{field: *, value: *}|boolean}
       */
    validateInput = (inputBlock, required, validator, warnMessage, key) => {
      const inputText = inputBlock.firstElementChild?.value;
      if (validateString(inputText)) {
        // ski
        if (!required && inputText === '') {
          return false;
        }

        if (!validator(inputText)) {
          this.showWarning(inputBlock, warnMessage);
          return false;
        }
        return {
          field: key,
          value: inputText,
        };
      } else {
        throw new Error(`
                    Input may contain only text. 
                    Recieved type ${typeof inputText}
                    `);
      }
    };

    /**
       * expected first child is input and last is warn field
       * @param {string} key - field name
       * @return {{field: *, value: *}|boolean}
       */
    validateInputById = (key) => {
      const {required, id, validator = (s) => s.length,
        warnMessage = '', inputValidator} = inputFields[key];
      const inputBlock = document.getElementById(id);
      if (!inputValidator) {
        if (inputBlock === null) {
          throw new Error(`
                    Input block with id ${id} was not found at key ${key}!
                    Check if it exists.
                    `);
        }
        return this.validateInput(inputBlock, required,
            validator, warnMessage, key, inputFields[key]);
      } else {
        return inputValidator(inputBlock, required,
            validator, warnMessage, key, inputFields[key]);
      }
    };

    /**
       * validates form
       * @return {[{field: *, value: *}]|[boolean]}
       */
    validate = () => {
      let requiredLength = 0;
      const validInputs =
          Object
              .keys(inputFields)
              .map(this.validateInputById)
              .filter((e) => {
                if (e && inputFields[e.field].required) {
                  ++requiredLength;
                }
                return e;
              });
      return requiredLength >= this.__expectedLength ? validInputs : null;
    };

    /**
       * Adds submit event
       */
    addSubmit = () => {
      document.getElementById(submitField.id).addEventListener('click', (e) => {
        e.preventDefault();
        const inputData = this.validate();
        if (inputData) {
          const arg = inputData.reduce((acc, v) => {
            acc[v.field] = v.value;
            return acc;
          }, {});
          onValid && onValid(arg);
        } else {
          onInvalid && onInvalid();
        }
      });
    }
  };
};

/**
 *
 * @param {[HTMLAnchorElement]} radios - array
 * @param {bool} required
 * @param {function} validator
 * @param {string} warnMessage
 * @param {string} key
 * @param {object} inputField
 * @return {{field: *, value: *}|boolean|{field: *, value: null}}
 */
export const validateRadio = (radios, required,
    validator, warnMessage, key, inputField) => {
  const v =
      document
          .querySelector(`input[name="${inputField.id}"]:checked`);
  if (v && required && !v.value) {
    return false;
  }
  if (!v) {
    return {
      field: key,
      value: null,
    };
  }
  return {
    field: key,
    value: v.value,
  };
};
/**
 *
 * @param {[HTMLAnchorElement]} inputBlock - array
 * @param {bool} required
 * @param {function} validator
 * @param {string} warnMessage
 * @param {string} key
 * @return {{field: *, value: *}|boolean}
 */
export const validateCheckBox = (inputBlock, required,
    validator, warnMessage, key) => {
  const checkbox = inputBlock;
  if (required && !checkbox?.checked) {
    return false;
  }
  return {
    field: key,
    value: checkbox.checked,
  };
};
/**
 *
 * @param {HTMLAnchorElement} inputBlock - array
 * @param {bool} required
 * @param {function} validator
 * @param {string} warnMessage
 * @param {string} key
 * @return {{field: string, value: string}}
 */
export const validateSelect = (inputBlock, required,
    validator, warnMessage, key) => {
  return {
    field: key,
    value: inputBlock.value,
  };
};

