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

  .recharts-responsive-container {
    margin: auto;
  }

  .recharts-wrapper {
    margin-left: -16px;
  }
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

const plotsData = {
  types: ['temp', 'hum', 'so2', 'no2', 'co'],
  labels: {
    temp: 'Temperature [°C]',
    hum: 'Relative Humidity [%]',
    so2: 'Sulphur dioxide [µg/m3]',
    no2: 'Nitrogen dioxide [µg/m3]',
    co: 'Carbon monoxide [µg/m3]'
  },
  strokes: {
    temp: '#82ca9d',
    hum: '#8884d8',
    so2: '#f7b016',
    no2: '#12e5be',
    co: '#ea1f09'
  }
};

const Overlay = ({ data, close }) => {
  return (
    <StyledOverlay data={data}>
      {data &&
        plotsData.types.map((type, index) => {
          if (!data[0][type]) return null;
          return (
            <React.Fragment key={type}>
              <Wrapper>
                <h2>{plotsData.labels[type]}</h2>
                {index === 0 && (
                  <Button type="button" onClick={close}>
                    <img src={closeIcon} className="App-logo" alt="close" />
                  </Button>
                )}
              </Wrapper>
              <ResponsiveContainer height="40%" width="90%">
                <LineChart width={300} height={300} data={data}>
                  >
                  <XAxis dataKey="name" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line
                    type="monotone"
                    dataKey={type}
                    stroke={plotsData.strokes[type]}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </React.Fragment>
          );
        })}
    </StyledOverlay>
  );
};

export default Overlay;
