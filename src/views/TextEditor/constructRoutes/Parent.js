export const parent = (ParentPage, props) => (childRoutes = []) => [
  {
    path: props.ROOT,
    alwaysOn: true,
    element: ParentPage,
    childRoutes,
  },
];
