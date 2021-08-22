import { Slider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React from 'react';

const StyledSlider = styled(Slider)(
  ({theme}) => ({
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
  {name: 'StyledSlider'}
);

const AdsrEnvelope = ({type}) => {
  return type === 'sustain' ? (
  <StyledSlider
    orientation="vertical"
    // getAriaValueText={valuetext}
    defaultValue={30}
    aria-labelledby="vertical-slider"
  />
) : <>{type}</>
};

export default AdsrEnvelope;
