import { Validator } from "../../../Validator";

export class LoginForm {

    constructor() {
        this.textInputNames = ['password'];

        this.emailOrPhoneNames = ['email-or-phone'];

        this.addSubmit();
    }

    validate() {
        let valid = true;

        this.textInputNames.forEach(inputName => {
            const inputBlock = document.querySelector(`.login-form-${inputName}`);
            const inputText = inputBlock.firstElementChild.value;
            const inputErrBlock = inputBlock.lastElementChild;

            if (Validator.correctText(inputText) !== 'OK_MESSAGE') {
                valid = false;

                inputErrBlock.textContent = 'Обязательное поле'
            } else {
                inputErrBlock.textContent = ''
            }
        });

        this.emailOrPhoneNames.forEach(inputName => {
            const inputBlock = document.querySelector(`.login-form-${inputName}`);
            const inputText = inputBlock.firstElementChild.value;
            const inputErrBlock = inputBlock.lastElementChild;

            if (Validator.correctMail(inputText) === 'OK_MESSAGE' || Validator.correctTel(inputText) === 'OK_MESSAGE') {
                inputErrBlock.textContent = ''
            } else {
                valid = false;

                inputErrBlock.textContent = 'Обязательное поле'
            }
        });

        return valid
    }

    addSubmit() {
        document.querySelector('.login-form-submit').addEventListener('click', (e) => {
            e.preventDefault();

            if (this.validate()) {
                console.log('valid')
            } else {
                console.log('invalid')
            }
        })
    }
}