import React, { useContext } from 'react';
import { Grid, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import content from 'utils/content';
import AdsrEnvelope from 'comps/AdsrEnvelope';
import { PcmDataContext } from '@/context/PcmDataContext';

const useStyles = makeStyles((theme) => ({
  border: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light
  }
}));

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
  const { DEFAULTS, setDuration } = useContext(PcmDataContext);
  const adsrContent = content.adsrDisplay;

  return (
    <>
      <AdsrEnvelope type={type} classes={{ ...classes }} />
      <InputContainer item>
        <AdsrInput
          inputProps={{
            'aria-label': `${adsrContent[type]} ${adsrContent.duration}`,
            min: 0,
            step: 0.1
          }}
          className={classes.border}
          type="number"
          defaultValue={DEFAULTS[type]}
          onChange={(e) => setDuration(type, e.target.value)}
        />
      </InputContainer>
    </>
  );
};

export default AdsrControl;
