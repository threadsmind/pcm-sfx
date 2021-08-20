import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import React from 'react';
import content from 'utils/content';

const StyledButton = styled(Button)(
  () => ({
    fontSize: '1.5rem',
    width: '100%'
  }),
  { name: 'StyledButton' }
);

const ActionButtons = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const buttonWidth = isMobile ? 12 : 3;

  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      direction={isMobile ? 'column' : 'row'
    }>
      <Grid item sm={buttonWidth}>
        <StyledButton variant="outlined">
          {content.actionButtons.playLabel}
        </StyledButton>
      </Grid>
      <Grid item sm={buttonWidth}>
        <StyledButton variant="outlined">
          {content.actionButtons.downloadLabel}
        </StyledButton>
      </Grid>
    </Grid>
  )
};

export default ActionButtons;
