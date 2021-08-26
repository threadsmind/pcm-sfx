import React, { createContext, useState } from 'react';
import { DEFAULTS, formulaRegex } from '@/constants';

export const PcmDataContext = createContext();

/**
 * Validates duration input.
 */
const validateValue = (input) => {
  const inputFloat = parseFloat(input);
  if (isNaN(inputFloat)) return null;
  return inputFloat >= 0 ? inputFloat : 0;
};

const PcmDataProvider = ({ children }) => {
  const [sustainVolume, setSustainVolume] = useState(DEFAULTS.sustainVolume);
  const [attack, setAttack] = useState(DEFAULTS.attack);
  const [decay, setDecay] = useState(DEFAULTS.decay);
  const [sustain, setSustain] = useState(DEFAULTS.sustain);
  const [release, setRelease] = useState(DEFAULTS.release);
  const [formula, _setFormula] = useState(DEFAULTS.formula);

  /**
   * Utility function to set ADSR duration values.
   * @param {string} target The target's state token string.
   * @param {number|string} value The new state value to attempt to set.
   */
  const setDuration = (target, value) => {
    const validatedValue = validateValue(value);
    if (validatedValue === null) return;

    if (target === 'attack') return setAttack(validatedValue);
    if (target === 'decay') return setDecay(validatedValue);
    if (target === 'sustain') return setSustain(validatedValue);
    if (target === 'release') return setRelease(validatedValue);
  };

  const setFormula = (value) => {
    const filteredValue = value.replace(formulaRegex, '');
    _setFormula(filteredValue);
  };

  const contextData = {
    sustainVolume,
    setSustainVolume,
    duration: {
      attack,
      decay,
      sustain,
      release
    },
    setDuration,
    formula,
    setFormula,
    DEFAULTS
  };

  return <PcmDataContext.Provider value={contextData}>{children}</PcmDataContext.Provider>;
};

export default PcmDataProvider;
