import React from 'react';
import { Grid, Box, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import content from 'utils/content';
import AdsrEnvelope from 'comps/AdsrEnvelope';

const useStyles = makeStyles((theme) => ({
  border: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light
  }
}));

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

const InputContainer = styled(Grid)(
  () => ({
    height: '3rem'
  }),
  { name: 'InputContainer' }
);

const AdsrInput = styled(Input)(
  ({ theme }) => ({
    color: theme.palette.primary.main,
    padding: `0 ${theme.spacing(1)}px`
  }),
  { name: 'AdsrInput' }
);

const AdsrControl = ({ type }) => {
  const classes = useStyles();
  const adsrContent = content.adsrDisplay;

  return (
    <>
      <EnvelopeContainer item className={classes.border}>
        <AdsrEnvelope type={type} />
      </EnvelopeContainer>
      <InputContainer item>
        <AdsrInput
          inputProps={{ 'aria-label': `${adsrContent[type]} ${adsrContent.duration}` }}
          className={classes.border}
          type="number"
          value="0"
        />
      </InputContainer>
    </>
  );
};

export default AdsrControl;
