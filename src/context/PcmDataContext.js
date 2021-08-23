import React, { createContext, useState } from 'react';

export const PcmDataContext = createContext();

const DEFAULT_VALUE = 75;

const PcmDataProvider = ({ children }) => {
  const [sustainVolume, setSustainVolume] = useState(DEFAULT_VALUE);
  return (
    <PcmDataContext.Provider value={{ sustainVolume, setSustainVolume, DEFAULT_VALUE }}>
      {children}
    </PcmDataContext.Provider>
  );
};

export default PcmDataProvider;
