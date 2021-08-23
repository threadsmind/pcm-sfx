import React from 'react';
import Layout from 'comps/Layout';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@/theme';
import PcmDataProvider from '@/context/PcmDataContext';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <PcmDataProvider>
      <Layout />
    </PcmDataProvider>
  </MuiThemeProvider>
);

export default App;
