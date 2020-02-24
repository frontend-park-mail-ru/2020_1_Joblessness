import {Validator} from '../../../Validator';

export class EmployerSignupForm {
  constructor() {
    this.textInputNames = ['company-name',
      'site',
      'city',
      'first-name',
      'second-name'];

    this.emailInputNames = ['email'];

    this.phoneInputNames = ['number',
      'additional-number'];

    this.addSubmit();
  }

  validate() {
    let valid = true;

    this.textInputNames.forEach((inputName) => {
      const inputBlock = document.querySelector(`.employer-signup-form-${inputName}`);
      const inputText = inputBlock.firstElementChild.value;
      const inputErrBlock = inputBlock.lastElementChild;

      if (Validator.correctText(inputText) !== 'OK_MESSAGE') {
        valid = false;

        inputErrBlock.textContent = 'Поле обязательно для заполнения';
      } else {
        inputErrBlock.textContent = '';
      }
    });

    this.emailInputNames.forEach((inputName) => {
      const inputBlock = document.querySelector(`.employer-signup-form-${inputName}`);
      const inputText = inputBlock.firstElementChild.value;
      const inputErrBlock = inputBlock.lastElementChild;

      if (Validator.correctMail(inputText) !== 'OK_MESSAGE') {
        valid = false;

        inputErrBlock.textContent = 'Пожалуйста, укажитие email';
      } else {
        inputErrBlock.textContent = '';
      }
    });

    this.phoneInputNames.forEach((inputName) => {
      const inputBlock = document.querySelector(`.employer-signup-form-${inputName}`);
      const inputText = inputBlock.firstElementChild.value;
      const inputErrBlock = inputBlock.lastElementChild;

      if (Validator.correctTel(inputText) !== 'OK_MESSAGE') {
        valid = false;

        inputErrBlock.textContent = 'Пожалуйста, укажите телефон';
      } else {
        inputErrBlock.textContent = '';
      }
    });

    return valid;
  }

  addSubmit() {
    document.querySelector('.employer-signup-form-submit').addEventListener('click', (e) => {
      e.preventDefault();

      if (this.validate()) {
        console.log('valid');
      } else {
        console.log('invalid');
      }
    });
  }
}
