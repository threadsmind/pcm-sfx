import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { PcmDataContext } from '@/context/PcmDataContext';
import React, { useContext } from 'react';
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
  const { duration, sustainVolume, formula } = useContext(PcmDataContext);
  const buttonWidth = isMobile ? 12 : 3;

  const handlePlay = (e) => {
    e.preventDefault();
    console.log(duration, sustainVolume, formula);
  };

  return (
    <Grid container justifyContent="center" spacing={3} direction={isMobile ? 'column' : 'row'}>
      <Grid item sm={buttonWidth}>
        <form onSubmit={handlePlay}>
          <StyledButton type="submit" variant="outlined">
            {content.actionButtons.playLabel}
          </StyledButton>
        </form>
      </Grid>
      <Grid item sm={buttonWidth}>
        <StyledButton variant="outlined">{content.actionButtons.downloadLabel}</StyledButton>
      </Grid>
    </Grid>
  );
};

export default ActionButtons;
