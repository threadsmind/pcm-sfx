import React, { useContext } from 'react';
import { Grid, TextField, Typography, useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { PcmDataContext } from '@/context/PcmDataContext';
import content from 'utils/content';

const FormulaContainer = styled(Grid)(
  () => ({
    '& fieldset': {
      display: 'none'
    }
  }),
  { name: 'FormulaContainer' }
);

const FormulaInput = styled(TextField)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.primary.light}`,
    backgroundColor: 'none',
    '& input': {
      fontFamily: 'Roboto Mono',
      letterSpacing: 1
    }
  }),
  { name: 'FormulaInput' }
);

const Formula = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { DEFAULTS, setFormula } = useContext(PcmDataContext);

  return (
    <FormulaContainer
      container
      alignItems="center"
      justifyContent="space-between"
      spacing={isMobile ? 0 : 1}
    >
      <Grid item xs={12} sm={2}>
        <Typography align={isMobile ? 'center' : 'left'}>{content.formula.title}</Typography>
      </Grid>
      <Grid item xs={12} sm={10}>
        <FormulaInput
          type="text"
          variant="outlined"
          defaultValue={DEFAULTS.formula}
          onChange={(e) => setFormula(e.target.value)}
          inputProps={{ 'aria-label': content.formula.inputLabel }}
          fullWidth
          autoFocus
        />
      </Grid>
    </FormulaContainer>
  );
};

export default Formula;
