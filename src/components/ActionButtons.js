import { Button, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';
import content from 'utils/content';

const StyledButton = styled(Button)(
  () => ({
    fontSize: '1.5rem',
    width: '100%'
  }),
  { name: 'StyledButton' }
);

const ActionButtons = () => (
  <Grid container justifyContent="center" spacing={3}>
    <Grid item sm={3}>
      <StyledButton variant="outlined">{content.actionButtons.playLabel}</StyledButton>
    </Grid>
    <Grid item sm={3}>
      <StyledButton variant="outlined">{content.actionButtons.downloadLabel}</StyledButton>
    </Grid>
  </Grid>
);

export default ActionButtons;
