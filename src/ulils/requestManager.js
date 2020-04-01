import {currentSession, request} from './index'
/**
 * Выполняет запросы к api
 * @class
 */
class RequestManager {
    /**
     * @example
     * {
     *     login* "login",
     *     password* "psw",
     * }
     */
    trySignIn (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/login', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     */
    tryCheckIn (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/check', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     */
    tryLogout (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/logout', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *      login* "string"
     *      password* "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
     *      firstName "string"
     *      lastName "string"
     *      gender "string"
     *      birthday "2006-01-02T15:04:05.999999999Z"
     * }
     */
    tryRegisterPerson (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *      login* "string"
     *      password* "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
	 *      name "string"
	 *      about "string"
	 *      site "string"
     * }
     */
    tryRegisterOrg (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/organizations', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     * @result
     * {
     *      login "string"
     *      avatar "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
     *      firstName "string"
     *      lastName "string"
     *      gender "string"
     *      birthday "2006-01-02T15:04:05.999999999Z"
     */
    tryGetPerson (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/users/' + slug, form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *      password "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
     *      firstName "string"
     *      lastName "string"
     *      gender "string"
     *      birthday "2006-01-02T15:04:05.999999999Z"
     * }
     */
    tryChangePerson (form) {
        return new Promise((resolve, reject) => {
            request
                .put('/api/users/' + currentSession.user.userId, form)
                .then((r) => {
                    if (r.status === 204) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     * @result
     * {
     *      login "string"
     *      avatar "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
     *      name "string"
     *      site "string"
     *      about "string"
     */
    tryGetOrg (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/organizations/' + slug, form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *      password "string"
     *      tag "string"
     *      email "string"
     *      phone "string"
     *      name "string"
     *      about "string"
     *      site "string"
     * }
     */
    tryChangeOrg (form) {
        return new Promise((resolve, reject) => {
            request
                .put('/api/organizations/' + currentSession.user.userId, form)
                .then((r) => {
                    if (r.status === 204) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     * @result
     * [{
     *      id uint64
     *      name "string"
     *      site "string"
     * }]
     */
    tryGetOrgs (form) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/organizations', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * multipart/form-data
     */
    trySetAvatar (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/' + slug + '/avatar', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     */
    trySetLike (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/' + slug + '/like', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * [{
     *      id uint64
     *      tag "string"
     *      is_person bool
     * }]
     */
    tryGetUserFavorites (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/users/' + slug + '/favorite', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *    name* "string"
     *    description "string"
     *    salary_from int
     *    salary_to int
     *    with_tax bool
     *    responsibilities "string"
     *    conditions "string"
     *    keywords "string"
     * }
     */
    tryCreateVacancy (form) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/vacancies', form)
                .then((r) => {
                    if (r.status === 201) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *    organization {
     *          ID uint64
     *          Tag "string"
     *          Email "string"
     *          Phone "string"
     *          Avatar "string"
     *          Name "string"
     *          Site "string"
     *    }
     *    id uint64
     *    name* "string"
     *    description "string"
     *    salary_from int
     *    salary_to int
     *    with_tax bool
     *    responsibilities "string"
     *    conditions "string"
     *    keywords "string"
     * }
     */
    tryGetVacancy (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/vacancies/' + slug, form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * [{
     *    organization {
     *          ID uint64
     *          Tag "string"
     *          Email "string"
     *          Phone "string"
     *          Avatar "string"
     *          Name "string"
     *          Site "string"
     *    }
     *    id uint64
     *    name* "string"
     *    description "string"
     *    salary_from int
     *    salary_to int
     *    with_tax bool
     *    responsibilities "string"
     *    conditions "string"
     *    keywords "string"
     * }]
     */
    tryGetVacancies (form) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/vacancies', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * {
     *    name "string"
     *    description "string"
     *    salary_from int
     *    salary_to int
     *    with_tax bool
     *    responsibilities "string"
     *    conditions "string"
     *    keywords "string"
     * }
     */
    tryChangeVacancy (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .put('/api/vacancies/' + slug, form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     */
    tryDeleteVacancy (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .delete('/api/vacancies/' + slug, form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * Тело запроса пустое
     * @result
     * [{
     *    id uint64
     *    name "string"
     *    salary_from int
     *    salary_to int
     *    with_tax bool
     *    keywords "string"
     * }]
     */
    tryGetOrgVacancies (form, slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/organizations/' + slug + '/vacancies', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }

    /**
     * @example
     * /api/search?type="person"&since=2&desc=true&request=awdwada
     * @result
     * persons [{
     *    id uint64
     *    first_name "string"
     *    last_name "string"
     *    tag "string"
     *    avatar "string"
     * }]
     * organizations [{
     *    id uint64
     *    name "string"
     *    tag "string"
     *    avatar "string"
     * }]
     * vacancies [{
     *    organization {
     *        id uint64
     *        name "string"
     *    }
     *    id uint64
     *    name "string"
     *    keywords "string"
     * }]
     */
    trySearch (form) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/search', form)
                .then((r) => {
                    if (r.status === 200) {
                        resolve(r);
                    } else {
                        reject(r);
                    }
                }).catch(reject);
        },);
    }
}

const requestManager = new RequestManager();

export {
    requestManager,
};