class Validator {

    /**
     * Проверяет строку на соответствие почте
     * @param mail строка с почтой
     * @returns {string} код результата
     */
    static correctMail(mail) {
        if (!mail) {
            return 'EMPTY_MESSAGE';
        }
        const mailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
        return (mailRegexp.test(mail)) ? 'OK_MESSAGE' : 'INCORRECT_MESSAGE';
    }

    /**
     * Проверяет строку на соответствие телефону
     * @param tel строка с телефоном
     * @returns {string} код результата
     */
    static correctTel(tel) {
        if (!tel) {
            return 'EMPTY_MESSAGE';
        }
        const telRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        return (telRegexp.test(tel)) ? 'OK_MESSAGE' : 'INCORRECT_MESSAGE';
    }

    /**
     * Проверка не пустого текстового поля
     * @param text строка текста
     * @returns {string} код результата
     */
    static correctText(text) {
        if (!text) {
            return 'EMPTY_MESSAGE';
        }

        return 'OK_MESSAGE';
    }

    //TODO заменить проверки чисел на регулярки
    /**
     * Проверка строки на соответствие положительному числу
     * @param number строка с числом
     * @returns {string} код результата
     */
    static correctNumberPositive(number) {
        let parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber) || parsedNumber <= 0) {
            return 'INCORRECT_MESSAGE';
        }

        return 'OK_MESSAGE';
    }

    /**
     * Провера строки на соответсвие числу
     * @param number строка с числом
     * @returns {string} код результата
     */
    static correctNumber(number) {
        let parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber)) {
            return 'INCORRECT_MESSAGE';
        }

        return 'OK_MESSAGE';
    }

    //TODO валидация радиобатонов


}