import { Validator } from "../../Validator";

class EmployerSignupForm {

    constructor() {
        this.textInputNames = ['company-name',
                               'site',
                               'city',
                               'first-name',
                               'second-name'];

        this.emailInputNames = ['email'];

        this.phoneInputNames = ['number',
                                'additional-number']
    }

    validate() {
        this.textInputNames.forEach(inputName => {
            const inputText = document.querySelector(`.employer-signup-form-${inputName}`).value;
            if (Validator.correctText(inputText) !== 'OK_MESSAGE') {
                return false
            }
        });

        this.textInputNames.forEach(inputName => {
            const inputText = document.querySelector(`.employer-signup-form-${inputName}`).value;
            if (Validator.correctMail(inputText) !== 'OK_MESSAGE') {
                return false
            }
        });

        this.textInputNames.forEach(inputName => {
            const inputText = document.querySelector(`.employer-signup-form-${inputName}`).value;
            if (Validator.correctTel(inputText) !== 'OK_MESSAGE') {
                return false
            }
        });

        return true
    }

    submit() {
        document.querySelector('.employer-signup-form-submit').addEventListener('click', () => {
            if (this.validate()) {
                alert('valid');
            } else {
                alert('invalid');
            }
        })
    }
}