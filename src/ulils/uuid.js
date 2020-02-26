/**
 * Generates unique string (suitable for dom id)
 * @return {string}
 */
export const uuid = () =>
  `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
