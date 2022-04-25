import React from 'react';
import AdsrDisplay from 'comps/AdsrDisplay';
import Formula from 'comps/Formula';
import AppTitle from 'comps/AppTitle';
import ActionButtons from 'comps/ActionButtons';
import AppContainer from 'comps/AppContainer';
import DisplayBox from 'comps/DisplayBox';

/**
 * Main app layout
 * @returns {JSX.Element} App layout component
 */
const Layout = () => (
  <AppContainer>
    <DisplayBox>
      <AppTitle />
      <AdsrDisplay />
      <Formula />
      <ActionButtons />
    </DisplayBox>
  </AppContainer>
);

export default Layout;
