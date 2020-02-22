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

    /**
     * Проверка строки на соответствие положительному числу
     * @param number строка с числом
     * @returns {string} код результата
     */
    static correctNumberPositive(number) {
        if (!number) {
            return 'EMPTY_MESSAGE';
        }

        const numberRegexp = /^[0-9]*[.,]?[0-9]+$/;
        return (numberRegexp.test(number)) ? 'OK_MESSAGE' : 'INCORRECT_MESSAGE';
    }

    /**
     * Провера строки на соответсвие числу
     * @param number строка с числом
     * @returns {string} код результата
     */
    static correctNumber(number) {
        if (!number) {
            return 'EMPTY_MESSAGE';
        }

        const numberRegexp = /^-?[0-9]*[.,]?[0-9]+$/;
        return (numberRegexp.test(number)) ? 'OK_MESSAGE' : 'INCORRECT_MESSAGE';
    }

    //TODO валидация радиобатонов
    // (ЗАЧЕМ НАМ ХЛЕБ С ФУНКЦИЕЙ РАДИО?)
}

export {
    Validator
}