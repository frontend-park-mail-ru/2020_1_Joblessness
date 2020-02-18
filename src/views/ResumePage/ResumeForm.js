import { Validator } from "../../Validator.js";
import { RequestManager } from "../../RequestManager.js";

const statusMessages = {
    OK_MESSAGE : "Успешно",
    EMPTY_MESSAGE : "Выделенные поля нельзя оставлять пустыми",
    INCORRECT_MESSAGE : "Некорректный формат ввода",
};

class ResumeForm {

    constructor() {
        this.addSubmitEvent();

        this.textInputs = {
            name:  "",
            surname: "",
            city: "",
            town: "",
            citizenship: "",
            no_exp_explanation: "",
        };

        this.phone = "";
        this.day= "";
        this.year= "";
        this.sex = "";

    }

    validateForm() {
        let inputIsValid = true;
        for (const [key, value] of Object.entries(this.textInputs)) {
            this.textInputs[key] = document.querySelector(`.resume_form__${key}`).value;
            if (Validator.correctText(this.textInputs[key]) !== 'OK_MESSAGE') {
                inputIsValid = false;
            }
        }

        return inputIsValid;
    }

    addSubmitEvent() {
        document.querySelector('.vacancy_page__button_submit').addEventListener('click', () => {
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