import { Grid } from '@material-ui/core';
import React from 'react';

const AdsrGrid = ({ children }) => (
  <Grid container direction="row">
    {children.map((child) => (
      <Grid container item xs={3} direction="column" key={child.props.type} alignContent="stretch">
        {child}
      </Grid>
    ))}
  </Grid>
);

export default AdsrGrid;
