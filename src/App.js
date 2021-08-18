import React from 'react';
import Layout from './components/Layout';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Layout />
  </MuiThemeProvider>
);

export default App;
