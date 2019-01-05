import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import styled from 'styled-components';
// leaflet styles
import '../../node_modules/leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import axios from 'axios';
import Overlay from './OverlayInfo';

const MapWrapper = styled('div')`
  .leaflet-container {
    width: 100vw;
    height: calc(100vh - 64px);
  }
`;

const customMarker = icon({
  iconUrl: require('../assets/raspberry.svg'),
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
        measurementsDate.push({
          name: timestamp,
          hum,
          temp
        });
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

  const [position, setPosition] = useState({});

  useEffect(() => {
    const lat = localStorage.getItem('location.latitude');
    const lng = localStorage.getItem('location.longitude');

    const pos = {
      lat: lat || 52.4167,
      lng: lng || 16.9333,
      zoom: 11
    };

    setPosition(pos);
  }, []);

  const displayDetails = markerData => {
    setOverlayData(markerData);
  };

  const [overlayData, setOverlayData] = useState(null);

  return (
    <MapWrapper>
      <Map center={position} zoom={position.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(marker => (
          <Marker
            key={marker.coordinates.lat + '.' + marker.coordinates.lat}
            position={marker.coordinates}
            icon={customMarker}
            onClick={() => displayDetails(marker.data)}
          />
        ))}
      </Map>
      <Overlay data={overlayData} close={() => setOverlayData(null)} />
    </MapWrapper>
  );
};

export default MainMap;
