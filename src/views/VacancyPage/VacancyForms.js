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
        let validationResult;
        for (const [key, value] of Object.entries(this.textInputs)) {
            validationResult = Validator.correctText(this.textInputs[key].value);
            if (validationResult !== 'OK_MESSAGE') {
                //TODO смена класса
                this.textInputs[key].value = '';
                this.textInputs[key].placeholder = statusMessages[validationResult];
                inputIsValid = false;
            }
        }

        for (const [key, value] of Object.entries(this.numberInputs)) {
            validationResult = Validator.correctText(this.numberInputs[key].value);
            if (validationResult !== 'OK_MESSAGE') {
                this.numberInputs[key].value = '';
                this.numberInputs[key].placeholder = statusMessages[validationResult];
                inputIsValid = false;
            }
        }

        validationResult = Validator.correctMail(this.manager_email.value);
        if (validationResult !== 'OK_MESSAGE') {
            this.manager_email.value = '';
            this.manager_email.placeholder = statusMessages[validationResult];
            inputIsValid = false;
        }

        validationResult = Validator.correctTel(this.manager_phone.value);
        if ( validationResult !== 'OK_MESSAGE') {
            this.manager_phone.value = '';
            this.manager_phone.placeholder = statusMessages[validationResult];
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
                //TODO создание запроса
                getBus().pagesOnScreen.vacancyPage.hidePage();
                getBus().pagesOnScreen.showVacancyPage.showPage();
            } else {
            }
        });
    }

}

export {
    VacancyForm
}