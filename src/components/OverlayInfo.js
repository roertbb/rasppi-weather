import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import closeIcon from '../assets/close.svg';

const StyledOverlay = styled.div`
  position: absolute;
  top: 64px;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: #fff;
  /* transition: opacity 0.3s ease-in-out; */
  /* opacity: ${({ data }) => (data != null ? 1 : 0)}; */
  z-index: ${({ data }) => (data != null ? 9999 : -9999)};
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 24px;

  h1 {
    margin: 0;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: #fff;

  img {
    width: 24px;
  }
`;

const Overlay = ({ data, close }) => {
  console.log('overlay', data);

  return (
    <StyledOverlay data={data}>
      <Wrapper>
        <h1>Temperature</h1>
        <Button type="button" onClick={close}>
          <img src={closeIcon} className="App-logo" alt="close" />
        </Button>
      </Wrapper>
      <ResponsiveContainer height="50%" width="90%">
        <LineChart width={300} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <Wrapper>
        <h1>Humidity</h1>
      </Wrapper>
      <ResponsiveContainer height="50%" width="90%">
        <LineChart width={300} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="hum" stroke="#8884d8" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </StyledOverlay>
  );
};

export default Overlay;
