import {validateString} from "./validators";

export const withForm = (WrappedComponent, inputFields, submitField,
                         onValid, onInvalid = null, propName = "inputFields") => {
    if (!WrappedComponent.isPageComponent) {
        throw new Error(`
        Expected Page component as WrappedComponent at withForm!
        `)
    }

    if (typeof inputFields !== "object") {
        throw new Error(`
        Expected Object as inputFields at withForm!
        `)
    }

    if (typeof submitField !== "object") {
        throw new Error(`
        Expected Object as submitField at withForm!
        `)
    }

    if (onInvalid !== null && typeof onInvalid !== "function") {
        throw new Error(`
        Expected function as onInvalid property at withForm!
        `)
    }

    if (typeof propName !== 'string') {
        throw new Error(`
        Expected string as propName at withForm!
        `)
    }

    return class extends WrappedComponent {
        constructor(...args) {
            super(...args);
            this.props[propName] = {
                ...inputFields,
                submitField,
            };
            this.__expectedLength = Object
                .keys(inputFields)
                .map(k => inputFields[k].required)
                .filter(e => e)
                .length
        }

        componentDidMount = () => {
            this.addSubmit()
        };
        showWarning = (inputBlock, warnMessage) => {
            const warnBlock = inputBlock.lastElementChild;
            warnBlock.textContent = warnMessage || 'Обязательное поле';
            const tid = setTimeout(
                () => {
                    warnBlock.textContent = ''
                }, 10000
            );
            const removeWarn = () => {
                clearTimeout(tid);
                warnBlock.textContent = '';
                document.removeEventListener('click', removeWarn, true);
            };
            document.addEventListener('click', removeWarn, true)
        };
        validateInput = (inputBlock, required, validator, warnMessage, key) => {
            const inputText = inputBlock.firstElementChild?.value;
            const inputErrBlock = inputBlock.lastElementChild;
            if (validateString(inputText)) {
                //ski
                if (!required && inputText === '')
                    return false;

                if (!validator(inputText)) {
                    this.showWarning(inputBlock, warnMessage);
                    return false;
                }
                return {
                    field: key,
                    value: inputText,
                }
            } else {
                throw new Error(`
                    Input may contain only text. Recieved type ${typeof inputText}
                    `);
            }
        };

        validateInputById = (key) => {
            const {required, id, validator = (s) => s.length, warnMessage = '', inputValidator} = inputFields[key];
            const inputBlock = document.getElementById(id);
            if (!inputValidator) {
                if (inputBlock === null) {
                    throw new Error(`
                    Input block with id ${id} was not found at key ${key}!
                    Check if it exists.
                    `);
                }
                return this.validateInput(inputBlock, required, validator, warnMessage, key)
            } else {
                return inputValidator(inputBlock, required, validator, warnMessage, key)
            }
        };

        validate = () => {
            let requiredLength = 0;
            const validInputs = Object.keys(inputFields).map(this.validateInputById).filter((e) => {
                if (e && inputFields[e.field].required) {
                    ++requiredLength;
                }
                return e;
            });
            return requiredLength >= this.__expectedLength ? validInputs : null;
        };

        addSubmit() {
            document.getElementById(submitField.id).addEventListener('click', (e) => {
                e.preventDefault();
                const inputData = this.validate();
                if (inputData) {
                    const arg = inputData.reduce((acc, v) => {
                        acc[v.field] = v.value;
                        return acc;
                    }, {});
                    onValid && onValid(arg)
                } else {
                    onInvalid && onInvalid()
                }
            })
        }
    }
};

export const validateRadio = (radios, required, validator, warnMessage, key) => {
    const v = document.querySelector(`input[name="${key}"]:checked`);
    if (v && required && !v.value)
        return false;
    if (!v) {
        return {
            field: key,
            value: null,
        }
    }
    return {
        field: key,
        value: v.value,
    }
};

export const validateCheckBox = (inputBlock, required, validator, warnMessage, key) => {
    const checkbox = inputBlock;
    if (required && !checkbox?.checked) {
        console.log('req chek false');
        return false;
    }
    console.log('chek true');
    return {
        field: key,
        value: checkbox.checked
    }
};
