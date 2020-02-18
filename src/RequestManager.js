const messagesFromHost = {
    HTTP_OK : 200,
    XHR_READY : 4
};

class RequestManager {

    /**
     * Возвращает url backend сервера
     * @returns {string}
     */
    static baseUrl() {
        // return  "Здесь наш хост";
        // для тестирования взаимодействия с сервером на localhost
        return  "http://localhost:8080/";
    }

    /**
     * POST-запрос на сервер
     * @param {string} address
     * @param {object} data
     * @param callback
     */
    static requestPost(address, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", this.baseUrl() + address, true);
        xhr.withCredentials = true; //for cookies

        const body = JSON.stringify(data);

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");

        xhr.send(body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    /**
     * GET-запрос на сервер
     * @param {string} address
     * @param callback
     */
    static requestGet(address, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.baseUrl() + address, true);
        xhr.withCredentials = true;

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    /**
     * PATCH-запрос на сервер
     * @param {string} address
     * @param {object} data
     * @param callback
     */
    static requestPatch(address, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", this.baseUrl() + address, true);
        xhr.withCredentials = true; //for cookies

        const body = JSON.stringify(data);

        xhr.setRequestHeader("Content-Type", "application/json; charset=utf8");

        xhr.send(body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== messagesFromHost.XHR_READY) {
                return;
            }
            if (+xhr.status !== messagesFromHost.HTTP_OK) {
                return callback(xhr, null);
            }

            const response = JSON.parse(xhr.responseText);
            callback(null, response);
        };
    }

    /**
     * Авторизация пользователя
     * @param login
     * @param password
     * @param callback
     */
    static auth(login, password, callback) {
        const user = {login, password};
        RequestManager.requestPost("api/users/signin", user, callback);
    }

    // если нужны какие-то методы для запроса чего-то конкретного, добавлять сюда.
    // например запрос для авторизации или регистрации или чего-нибудь еще
}

export {
    RequestManager
}