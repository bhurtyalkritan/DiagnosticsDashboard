// components/ChargerIssueMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { styled } from '@mui/system';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import chargerIconUrl from '../public/charger-icon.png'; // Adjust the path to your image

const chargerIssues = [
  { id: 1, location: [37.7749, -122.4194], description: 'Charger not working' },
  { id: 2, location: [34.0522, -118.2437], description: 'Slow charging' },
  { id: 3, location: [40.7128, -74.0060], description: 'Connection issues' },
];

const StyledMapContainer = styled(MapContainer)({
  height: '300px',
  width: '100%',
});

const customIcon = new L.Icon({
  iconUrl: chargerIconUrl,
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const ChargerIssueMap = () => {
  return (
    <StyledMapContainer center={[37.7749, -122.4194]} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {chargerIssues.map((issue) => (
        <Marker key={issue.id} position={issue.location} icon={customIcon}>
          <Popup>{issue.description}</Popup>
        </Marker>
      ))}
    </StyledMapContainer>
  );
};

export default ChargerIssueMap;
