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
    tryLogout () {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/logout', {})
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
    tryGetPerson (slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/users/' + slug ,{})
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
                .put('/api/users/' + currentSession.user.id, form)
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
    tryGetOrg (slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/organizations/' + slug, {})
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
                .put('/api/organizations/' + currentSession.user.id, form)
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
     * {
            summaryId uint64
         }
     */
    trySendSummary (vacId, sumId) {
      return new Promise((resolve, reject) => {
        request
          .post('/vacancies/' + vacId + '/response', {
            summaryId: sumId,
          })
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
     * {
            vacancyId uint64
            accepted bool
            denied bool
         }
     */
    tryResponseSummary (form, slug) {
      return new Promise((resolve, reject) => {
        request
          .put('/summaries/' + slug + '/response', form)
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
    trySetLike (slug) {
        return new Promise((resolve, reject) => {
            request
                .post('/api/users/' + slug + '/like', {})
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
    tryGetVacancy (slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/vacancies/' + slug, {})
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
    tryDeleteVacancy (slug) {
        return new Promise((resolve, reject) => {
            request
                .DELETE('/api/vacancies/' + slug, {})
                .then((r) => {
                    if (r.status === 200 || r.status === 204) {
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
    tryGetOrgVacancies (slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/organizations/' + slug + '/vacancies', {})
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
     * /api/search?type=person&since=2&desc=true&request=awdwada
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
    trySearch ({type = "", since = "0", desc = "true", requestBody = ""}) {
        return new Promise((resolve, reject) => {
            request
                .get(`/api/search?type=${type}&since=${since}&desc=${desc}&request=${requestBody}`, {})
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
     [{
    "id": 0,
    "keywords": "string",
        "author": {
          "id": 0,
          "name": "string",
          "gender": "string",
          "birthday": "2020-04-03T18:51:23.179Z"
        },
        "educations": [
          {
            "id": 0,
            "institution": "string",
            "speciality": "string",
            "graduated": "2020-04-03T18:51:23.179Z",
            "type": "string"
          }
        ],
        "experiences": [
          {
            "id": 0,
            "company_name": "string",
            "role": "string",
            "responsibilities": "string",
            "start": "2020-04-03T18:51:23.179Z",
            "stop": "2020-04-03T18:51:23.179Z"
          }
        ]
    }]
     */
    tryGetUserSummaries (slug) {
        return new Promise((resolve, reject) => {
            request
                .get('/api/users/' + slug + '/summaries', {})
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