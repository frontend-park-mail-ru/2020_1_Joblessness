/**
 * Generates unique string (suitable for dom id)
 * @returns {string}
 */
export const uuid = () =>
    `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;