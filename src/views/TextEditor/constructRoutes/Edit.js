export const edit = (EditPage, props) => (childRoutes = []) => [
  {
    path: 'editMode/',
    innerPath: 'editMode/',
    alwaysOn: true,
    element: EditPage,
    childRoutes,
  },
];