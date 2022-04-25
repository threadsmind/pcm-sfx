export const DEFAULTS = {
  sustainVolume: 75,
  attack: 0.2,
  decay: 0.5,
  sustain: 2,
  release: 0.4,
  formula: '(c/64)<<(c*32)&(c*4)'
};

export const formulaRegex = /[^+\-/()><&|*c0-9]/g;
