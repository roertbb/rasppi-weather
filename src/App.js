import React from 'react';
import MainMap from './components/MainMap';
import Nav from './components/Nav';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Nav />
        <MainMap />
      </Container>
    </>
  );
};

export default App;
