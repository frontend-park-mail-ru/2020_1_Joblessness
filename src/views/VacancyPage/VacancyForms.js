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
            job_title:  "",
            description: "",
            skills: "",
            town: "",
            address: "",
            manager: "",
            comment: "",
        };

        this.checkboxInputs = {
            invisible_address: false,
            notificate_by_email: false,
            invisible_contacts: false,
            save_temp: false,
        };

        this.numberInputs = {
            payment_from: "",
            payment_to: "",
        };

        this.manager_email = "";
        this.manager_phone = "";
        this.salary_type = "";

    }

    validateForm() {
        let inputIsValid = true;
        for (const [key, value] of Object.entries(this.textInputs)) {
            console.log(`.vacancy_form__${key}`);
            this.textInputs[key] = document.querySelector(`.vacancy_form__${key}`).value;
            if (Validator.correctText(this.textInputs[key]) !== 'OK_MESSAGE') {
                inputIsValid = false;
            }
        }

        for (const [key, value] of Object.entries(this.numberInputs)) {
            this.numberInputs[key] = document.querySelector(`.vacancy_form__${key}`).value;
            if (Validator.correctNumberPositive(this.numberInputs[key]) !== 'OK_MESSAGE') {
                inputIsValid = false;
            }
        }

        this.manager_email = document.querySelector('.vacancy_form__manager_email').value;
        if (Validator.correctMail(this.manager_email) !== 'OK_MESSAGE') {
            inputIsValid = false;
        }

        this.manager_phone = document.querySelector('.vacancy_form__manager_phone').value;
        if (Validator.correctTel(this.manager_phone) !== 'OK_MESSAGE') {
            inputIsValid = false;
        }

        document.querySelectorAll('.vacancy_form__salary_type').forEach(radiobutton => {
           if (radiobutton.checked) {
               this.salary_type = radiobutton.value;
           }
        });
        if (this.salary_type === "") {
            inputIsValid = false;
        }

        for (const [key, value] of Object.entries(this.checkboxInputs)) {
            this.checkboxInputs[key] = document.querySelector(`.vacancy_form__${key}`).checked;
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
    VacancyForm
}