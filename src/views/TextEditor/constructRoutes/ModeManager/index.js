import {createBeforeNext} from './beforeNext';

export const modeManager = (ModeManagerPage, props) => (childRoutes = []) => [
  {
    path: 'modeManager/',
    alwaysOn: true,
    element: ModeManagerPage,
    beforeNext: createBeforeNext(props),
    childRoutes,
  },
];