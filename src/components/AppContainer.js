import React from 'react';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';

const StyledGrid = styled(Grid)(
  () => ({
    width: '100vw',
    height: '100vh'
  }),
  { name: 'AppContainer' }
);

const AppContainer = ({ children }) => (
  <StyledGrid container alignItems="center" justifyContent="center" direction="column">
    {children}
  </StyledGrid>
);

export default AppContainer;
