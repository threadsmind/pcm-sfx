import { Slider, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Linear from '@/svg/Linear';
import React from 'react';

const EnvelopeContainer = styled(Grid)(
  () => ({
    height: 120,
    '& .MuiSlider-root.MuiSlider-vertical': {
      width: '100%',
      padding: 0
    }
  }),
  { name: 'EnvelopeContainer' }
);

const StyledSlider = styled(Slider)(
  ({ theme }) => ({
    color: theme.palette.secondary.main,
    '& .MuiSlider-rail, & .MuiSlider-track': {
      width: '100%'
    },
    '& .MuiSlider-rail': {
      color: theme.palette.primary.light
    },
    '& .MuiSlider-vertical .MuiSlider-thumb': {
      margin: 0
    },
    '& .MuiSlider-thumb': {
      color: theme.palette.primary.main,
      width: '100%',
      marginLeft: 0,
      marginTop: -3,
      borderRadius: 0,
      height: 6
    }
  }),
  { name: 'StyledSlider' }
);

const AdsrEnvelope = ({ type, classes }) => {
  const value = 30;

  return (
    <EnvelopeContainer className={classes.border}>
      {type === 'sustain' ? (
        <StyledSlider
          orientation="vertical"
          // getAriaValueText={valuetext}
          defaultValue={value}
          aria-labelledby="vertical-slider"
        />
      ) : (
        <Linear type={type} value={value} />
      )}
    </EnvelopeContainer>
  );
};

export default AdsrEnvelope;
