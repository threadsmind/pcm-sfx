import { Slider, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Linear from '@/svg/Linear';
import React, { useContext } from 'react';
import content from 'utils/content';
import { PcmDataContext } from '@/context/PcmDataContext';

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

const valueText = (value) => `${value}%`;

const AdsrEnvelope = ({ type, classes }) => {
  const { sustainVolume, setSustainVolume, DEFAULT_VALUE } = useContext(PcmDataContext);
  const adsrContent = content.adsrDisplay;

  return (
    <EnvelopeContainer className={classes.border}>
      {type === 'sustain' ? (
        <StyledSlider
          orientation="vertical"
          getAriaValueText={valueText}
          defaultValue={DEFAULT_VALUE}
          aria-label={`${adsrContent[type]} ${adsrContent.volume}`}
          onChange={(_, newValue) => {
            setSustainVolume(newValue);
          }}
        />
      ) : (
        <Linear type={type} value={sustainVolume} />
      )}
    </EnvelopeContainer>
  );
};

export default AdsrEnvelope;
