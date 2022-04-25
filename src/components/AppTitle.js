import React from 'react';
import Typography from '@material-ui/core/Typography';
import content from 'utils/content';

const AppTitle = () => (
  <Typography align="center" variant="h1">
    {content.appTitle}
  </Typography>
);

export default AppTitle;
