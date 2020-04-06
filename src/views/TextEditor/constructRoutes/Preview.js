export const preview = (PreviewPage, props) => (childRoutes = []) => [
  {
    path: 'previewMode/',
    alwaysOn: true,
    element: PreviewPage,
    childRoutes,
  },
];
