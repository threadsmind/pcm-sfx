import React from 'react';
import ADSRDisplay from '@/ADSRDisplay';
import Formula from '@/Formula';
import AppTitle from '@/AppTitle';
import ActionButtons from '@/ActionButtons';
import AppContainer from '@/AppContainer';
import DisplayBox from '@/DisplayBox';

/**
 * Main app layout
 * @returns {JSX.Element} App layout component
 */
const Layout = () => (
  <AppContainer>
    <DisplayBox>
      <AppTitle />
      <ADSRDisplay />
      <Formula />
      <ActionButtons />
    </DisplayBox>
  </AppContainer>
);

export default Layout;
