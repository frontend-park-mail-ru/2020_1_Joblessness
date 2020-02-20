import { getBus } from "../../ulils/getBus";
import { Validator } from "../../Validator.js";
import { RequestManager } from "../../RequestManager.js";

const statusMessages = {
    OK_MESSAGE : "Успешно",
    EMPTY_MESSAGE : "Выделенные поля нельзя оставлять пустыми",
    INCORRECT_MESSAGE : "Некорректный формат ввода",
};

class VacancyForm {

    constructor() {
        this.addSubmitEvent();

        this.textInputs = {
            "job-title":  "",
            description: "",
            skills: "",
            town: "",
            address: "",
            manager: "",
            comment: "",
        };
        for (const [key, value] of Object.entries(this.textInputs)) {
            this.textInputs[key] = document.querySelector(`.vacancy-form__${key}`);
        }

        this.checkboxInputs = {
            "invisible-address": false,
            "notificate-by-email": false,
            "invisible-contacts": false,
            "save-temp": false,
        };

        this.numberInputs = {
            "payment-from": "",
            "payment-to": "",
        };
        for (const [key, value] of Object.entries(this.numberInputs)) {
            this.numberInputs[key] = document.querySelector(`.vacancy-form__${key}`);
        }

        this.manager_email = document.querySelector('.vacancy-form__manager-email');
        this.manager_phone = document.querySelector('.vacancy-form__manager-phone');
        this.salary_type = "";

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

        for (const [key, value] of Object.entries(this.numberInputs)) {
            let validationResult = Validator.correctText(this.numberInputs[key].value);
            if (validationResult !== 'OK_MESSAGE') {
                this.numberInputs[key].value = statusMessages[validationResult];
                inputIsValid = false;
            }
        }

        if (Validator.correctMail(this.manager_email.value) !== 'OK_MESSAGE') {
            inputIsValid = false;
        }

        if (Validator.correctTel(this.manager_phone.value) !== 'OK_MESSAGE') {
            inputIsValid = false;
        }

        document.querySelectorAll('.vacancy-form__salary-type').forEach(radiobutton => {
           if (radiobutton.checked) {
               this.salary_type = radiobutton.value;
           }
        });
        if (this.salary_type === "") {
            inputIsValid = false;
        }

        for (const [key, value] of Object.entries(this.checkboxInputs)) {
            this.checkboxInputs[key] = document.querySelector(`.vacancy-form__${key}`).checked;
        }

        return inputIsValid;
    }

    addSubmitEvent() {
        document.querySelector('.vacancy-page__button-submit').addEventListener('click', () => {
            if ( this.validateForm() ) {
                console.log('da');
                //TODO создание запроса
                getBus().pagesOnScreen.vacancyPage.hidden = true;
                getBus().pagesOnScreen.showVacancyPage.hidden = false;
            } else {
                console.log(this.textInputs["job-title"]);
            }
        });
    }

}

export {
    VacancyForm
}