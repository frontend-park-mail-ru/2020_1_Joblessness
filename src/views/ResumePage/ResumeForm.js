import { Validator } from '../../Validator.js';
import { RequestManager } from '../../RequestManager.js';
import {getBus} from "../../ulils/getBus";

const statusMessages = {
    OK_MESSAGE : 'Успешно',
    EMPTY_MESSAGE : 'Выделенные поля нельзя оставлять пустыми',
    INCORRECT_MESSAGE : 'Некорректный формат ввода',
};

class ResumeForm {

    constructor() {
        this.addSubmitEvent();

        this.textInputs = {
            name:  '',
            surname: '',
            city: '',
            citizenship: '',
            "no-exp-explanation": '',
            education: '',
        };
        for (const [key, value] of Object.entries(this.textInputs)) {
            this.textInputs[key] = document.querySelector(`.resume-form__${key}`);
        }

        this.phone = document.querySelector('.resume-form__phone');
        this.day= document.querySelector('.resume-form__day');
        this.year= document.querySelector('.resume-form__year');
        this.gender = '';

    }

    validateForm() {
        let inputIsValid = true;
        let validationResult;
        for (const [key, value] of Object.entries(this.textInputs)) {
            validationResult = Validator.correctText(this.textInputs[key].value);
            if (validationResult !== 'OK_MESSAGE') {
                //TODO смена класса
                this.textInputs[key].value = "";
                this.textInputs[key].placeholder = statusMessages[validationResult];
                inputIsValid = false;
            }
        }

        validationResult = Validator.correctTel(this.phone.value);
        if ( validationResult !== 'OK_MESSAGE') {
            this.phone.value = "";
            this.phone.placeholder = statusMessages[validationResult];
            inputIsValid = false;
        }

        document.querySelectorAll('.resume-form__gender').forEach(radiobutton => {
            if (radiobutton.checked) {
                this.gender = radiobutton.value;
            }
        });
        if (this.gender === "") {
            inputIsValid = false;
        }


        return inputIsValid;
    }

    addSubmitEvent() {
        document.querySelector('.resume-form__button-submit').addEventListener('click', () => {
            if ( this.validateForm() ) {
                //TODO создание запроса
                getBus().pagesOnScreen.resumePage.hidePage();
                getBus().pagesOnScreen.showResumePage.showPage();
            } else {
                console.log(this.phone.value)

                //TODO вместо алерт добавить какое-то поле для ошибок
            }
        });
    }

}

export {
    ResumeForm
}