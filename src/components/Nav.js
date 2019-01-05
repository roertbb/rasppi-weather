import React from 'react';
import styled from 'styled-components';
import logo from '../assets/raspberry.svg';

const StyledNav = styled.nav`
  height: 64px;
  width: 100vw;
  background-color: #ed2a7e;
  display: flex;
  flex-direction: row;
  padding: 8px;
  color: #fff;
  align-items: center;
  justify-content: center;

  img {
    margin-left: 8px;
    width: 48px;
    height: 48px;
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <h1>RaspPi</h1>
      <img src={logo} alt="logo" />
      <h1>Weather</h1>
    </StyledNav>
  );
};

export default Nav;
