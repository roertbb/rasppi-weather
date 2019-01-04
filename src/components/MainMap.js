import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
// leaflet styles
import '../../node_modules/leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import axios from 'axios';

const MapWrapper = styled('div')`
  .leaflet-container {
    width: 100vw;
    height: calc(100vh - 64px);
  }
`;

const customMarker = icon({
  iconUrl: require('../assets/marker.png'),
  iconSize: [50, 50]
});

const MainMap = () => {
  const [data, setData] = useState([]);

  const getMeasurements = async () => {
    const measurements = await axios.get(
      `${process.env.REACT_APP_DBURL}/measurements.json`
    );
    const parsedMeasurements = [];
    for (const place in measurements.data) {
      const measurementsDate = [];
      const coords = place.split('-');
      const lat = Number(coords[0] + '.' + coords[1]);
      const lng = Number(coords[2] + '.' + coords[3]);
      const entries = measurements.data[place];
      for (const entry in entries) {
        const { hum, temp, timestamp } = entries[entry];
        measurementsDate[timestamp] = {
          hum,
          temp
        };
      }
      const parsedPlace = {
        coordinates: {
          lat,
          lng
        },
        data: measurementsDate
      };
      parsedMeasurements.push(parsedPlace);
    }
    setData(parsedMeasurements);
  };

  useEffect(() => {
    getMeasurements();
  }, []);

  console.log(data);

  const position = {
    lat: 52.4167,
    lng: 16.9333,
    zoom: 11
  };

  return (
    <MapWrapper>
      <Map center={position} zoom={position.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(marker => (
          <Marker
            key={marker.coordinates}
            position={marker.coordinates}
            icon={customMarker}
          />
        ))}
      </Map>
    </MapWrapper>
  );
};

export default MainMap;