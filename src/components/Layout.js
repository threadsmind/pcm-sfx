import { Box, Typography } from '@material-ui/core';
import React from 'react';
import ADSRDisplay from './ADSRDisplay';
import Formula from './Formula';
import ActionButtons from './ActionButtons';
import content from '../utils/content';

const Layout = () => (
  <Box>
    <Typography variant="h1">{content.appTitle}</Typography>
    <ADSRDisplay />
    <Formula />
    <ActionButtons />
  </Box>
);

export default Layout;
