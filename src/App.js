import React from 'react';
import Layout from 'comps/Layout';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@/theme';
import PcmDataProvider from '@/context/PcmDataContext';
import AudioSystemProvider from './context/AudioSystemContext';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <PcmDataProvider>
      <AudioSystemProvider>
        <Layout />
      </AudioSystemProvider>
    </PcmDataProvider>
  </MuiThemeProvider>
);

export default App;
