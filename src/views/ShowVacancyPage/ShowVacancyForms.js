import {Validator} from '../../Validator.js';
import {RequestManager} from '../../RequestManager.js';

const statusMessages = {
  OK_MESSAGE: 'Успешно',
  EMPTY_MESSAGE: 'Выделенные поля нельзя оставлять пустыми',
  INCORRECT_MESSAGE: 'Некорректный формат ввода',
};

class ShowVacancyForm {
  constructor() {
    this.addSubmitEvent();

    this.textInputs = {
      job_title: '',
      description: '',
      skills: '',
      town: '',
      address: '',
      manager: '',
      comment: '',
    };
    for (const [key, value] of Object.entries(this.textInputs)) {
      this.textInputs[key] = document.querySelector(`.vacancy_form__${key}`);
    }

    this.checkboxInputs = {
      invisible_address: false,
      notificate_by_email: false,
      invisible_contacts: false,
      save_temp: false,
    };

    this.numberInputs = {
      payment_from: '',
      payment_to: '',
    };
    for (const [key, value] of Object.entries(this.numberInputs)) {
      this.numberInputs[key] = document.querySelector(`.vacancy_form__${key}`);
    }

    this.manager_email = document.querySelector('.vacancy_form__manager_email');
    this.manager_phone = document.querySelector('.vacancy_form__manager_phone');
    this.salary_type = '';
  }

  validateForm() {
    let inputIsValid = true;
    for (const [key, value] of Object.entries(this.textInputs)) {
      const validationResult = Validator.correctText(this.textInputs[key].value);
      if (validationResult !== 'OK_MESSAGE') {
        // TODO смена класса
        this.textInputs[key].value = statusMessages[validationResult];
        inputIsValid = false;
      }
    }

    for (const [key, value] of Object.entries(this.numberInputs)) {
      const validationResult = Validator.correctText(this.numberInputs[key].value);
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

    document.querySelectorAll('.vacancy_form__salary_type').forEach((radiobutton) => {
      if (radiobutton.checked) {
        this.salary_type = radiobutton.value;
      }
    });
    if (this.salary_type === '') {
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
        // TODO создание запроса
      }
    });
  }
}

export {
  ShowVacancyForm,
};
