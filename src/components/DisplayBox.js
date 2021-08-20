import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import theme from '../theme';

const StyledGrid = styled(Grid)(
  ({ theme }) => ({
    width: '800px',
    maxWidth: '100%',
    border: `2px solid ${theme.palette.primary.light}`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    }
  }),
  { name: 'DisplayBox' }
);

const DisplayBox = ({ children }) => (
  <StyledGrid container spacing={4} direction="column">
    {children.map((child) => (
      <Grid item key={child.type.name}>
        {child}
      </Grid>
    ))}
  </StyledGrid>
);

export default DisplayBox;
