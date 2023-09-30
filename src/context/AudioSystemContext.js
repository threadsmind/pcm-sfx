import React, { createContext, useState } from 'react';

export const AudioSystemContext = createContext();

const AudioSystemProvider = ({ children }) => {
  const [audioContext, setAudioContext] = useState(null);

  const createAudioContext = () => {
    setAudioContext(new AudioContext());
  };

  const contextData = { createAudioContext };

  return <AudioSystemContext.Provider value={contextData}>{children}</AudioSystemContext.Provider>;
};

export default AudioSystemProvider;
