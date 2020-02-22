import {Validator} from "../../../Validator";
import {validateString} from "../../../ulils";
//@TODO JsDoc
//@TODO refactoring
export const withForm = (WrappedComponent, inputFields, submitField, onValid, onInvalid = null, propName = "inputFields") => {
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
            setTimeout(
                () => {
                    warnBlock.textContent = ''
                }, 500
            )
        };
        validateInputById = (key) => {
            const {required, id, validator = () => true, warnMessage = ''} = inputFields[key];
            const inputBlock = document.getElementById(id);
            if (inputBlock === null) {
                throw new Error(`
                    Input block with id ${id} was not found!
                    Check if it exists.
                    `);
            }
            const inputText = inputBlock.firstElementChild.value;
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
                    Input may only text. Recieved type ${typeof inputText}
                    `);
            }
        };
        validate = () => {
            const validInputs = Object.keys(inputFields).map(this.validateInputById).filter(e => e);
            return validInputs.length >= this.__expectedLength ? validInputs : null;

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