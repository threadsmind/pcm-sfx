import React from 'react';
import AdsrGrid from 'comps/AdsrGrid';
import AdsrControl from 'comps/AdsrControl';

const AdsrDisplay = () => (
  <AdsrGrid>
    <AdsrControl type="attack" />
    <AdsrControl type="decay" />
    <AdsrControl type="sustain" />
    <AdsrControl type="release" />
  </AdsrGrid>
);

export default AdsrDisplay;
