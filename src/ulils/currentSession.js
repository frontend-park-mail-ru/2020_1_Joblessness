/**
 * stores current session. Works as singleton
 */
class CurrentSession {
  #userId;
  #isAuthenticated;

  /**
   * init default value
   */
  constructor() {
    this.#userId = 0;
    this.#isAuthenticated = false;
  }
  /**
   * set session
   * @param {string|number} id - user id to set
   */
  set session(id) {
    if (typeof id === 'string') {
      if (isNaN(parseInt(id))) {// float will be floored e.g 123.1 => 123
        throw new Error(`
        Expected integer as user ID, received ${id}
        `);
      }
      this.#userId = parseInt(id);
      this.#isAuthenticated = true;
    } else if (typeof id === 'number') {
      if (isNaN(id)) {
        throw new Error(`
        Expected integer as user ID, received NaN`);
      }
      this.#userId = Math.floor(id);
      this.#isAuthenticated = true;
    } else {
      throw new Error(`
      Expected string or number as ID.
      String or number may represent integer.
      otherwise it will be floored.
      received ${id}`);
    }
  }

  /**
   *
   * @return {{userId: *}|null}
   */
  get user() {
    if (this.#userId === 0) {
      return null;
    }
    return {
      id: this.#userId,
    };
  }

  /**
   *
   * @return {boolean}
   */
  get isAuthenticated() {
    return this.#isAuthenticated;
  }
}

const currentSession = new CurrentSession();

export {
  currentSession,
};
