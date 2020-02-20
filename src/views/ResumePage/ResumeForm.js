import { Validator } from '../../Validator.js';
import { RequestManager } from '../../RequestManager.js';

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
            town: '',
            citizenship: '',
            "no-exp-explanation": '',
        };
        for (const [key, value] of Object.entries(this.textInputs)) {
            this.textInputs[key] = document.querySelector(`.resume-form__${key}`);
        }

        this.phone = document.querySelector('.resume-form__phone');
        this.day= document.querySelector('.resume-form__day');
        this.year= document.querySelector('.resume-form__year');
        this.sex = '';

    }

    validateForm() {
        let inputIsValid = true;
        for (const [key, value] of Object.entries(this.textInputs)) {
            let validationResult = Validator.correctText(this.textInputs[key].value);
            if (validationResult !== 'OK_MESSAGE') {
                //TODO смена класса
                this.textInputs[key].value = statusMessages[validationResult];
                inputIsValid = false;
            }
        }

        if (Validator.correctTel(this.phone.value) !== 'OK_MESSAGE') {
            inputIsValid = false;
        }

        document.querySelectorAll('.resume-form__sex').forEach(radiobutton => {
            if (radiobutton.checked) {
                this.salary_type = radiobutton.value;
            }
        });
        if (this.sex === "") {
            inputIsValid = false;
        }


        return inputIsValid;
    }

    addSubmitEvent() {
        document.querySelector('.vacancy-page__button-submit').addEventListener('click', () => {
            if ( this.validateForm() ) {
                console.log('da');
                //TODO создание запроса
            } else {
                //TODO вместо алерт добавить какое-то поле для ошибок
                alert(this.validateForm());
            }
        });
    }

}

export {
    ResumeForm
}