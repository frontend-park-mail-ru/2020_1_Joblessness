/**
 * stores current session. Works as singleton
 */
class CurrentSession {
  #userId;
  #isAuthenticated;
  #events;
  /**
   * init default value
   */
  constructor() {
    this.#userId = 0;
    this.#events = {
      change: []
    };
    this.#isAuthenticated = false;
  }
  /**
   * set session
   * @param {string|number|null} id - user id to set
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
      this.onChange();
    } else if (typeof id === 'number') {
      if (isNaN(id)) {
        throw new Error(`
        Expected integer as user ID, received NaN`);
      }
      this.#userId = Math.floor(id);
      this.#isAuthenticated = true;
      this.onChange();
    } else if (id === null) {
      this.#userId = 0;
      this.#isAuthenticated = false;
      this.onChange();
    } else {
      throw new Error(`
      Expected string or number as ID.
      Or null to clear session.
      String or number may represent integer.
      otherwise it will be floored
      received ${id}`);
    }
  }

  /**
   *
   * @return {{userId: *}|null}
   */
  get user() {
    if (this.#userId === 0) {
      return {
        id: 0,
      };
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

  onChange() {
    this.#events['change'].forEach(e => ({
      isAuthenticated: this.#isAuthenticated,
      userId: this.#userId
    }))
  }
  addEventListener(eventName, event) {
    this.#events[eventName]?.push();
  }
  removeEventListener(eventName, event) {
    this.#events[eventName] = this.#events[eventName].map( e => e !== event);
  }
}

const currentSession = new CurrentSession();

export {
  currentSession,
};
