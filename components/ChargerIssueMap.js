import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { styled } from '@mui/system';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const chargerIssues = [
  { id: 1, location: [37.7749, -122.4194], description: 'Charger not working' },
  { id: 2, location: [34.0522, -118.2437], description: 'Slow charging' },
  { id: 3, location: [40.7128, -74.0060], description: 'Connection issues' },
  { id: 4, location: [41.8781, -87.6298], description: 'Charger not accessible' },
  { id: 5, location: [29.7604, -95.3698], description: 'Broken screen' },
  { id: 6, location: [39.7392, -104.9903], description: 'Overheating' },
  { id: 7, location: [32.7767, -96.7970], description: 'Cable issue' },
  { id: 8, location: [47.6062, -122.3321], description: 'No power' },
  { id: 9, location: [33.4484, -112.0740], description: 'Loose connection' },
  { id: 10, location: [25.7617, -80.1918], description: 'Charger damaged' },
  { id: 11, location: [42.3601, -71.0589], description: 'Error message' },
  { id: 12, location: [38.9072, -77.0369], description: 'Out of order' },
  { id: 13, location: [45.5122, -122.6587], description: 'Intermittent issues' },
  { id: 14, location: [36.1627, -86.7816], description: 'Payment system down' },
  { id: 15, location: [35.2271, -80.8431], description: 'System reboot needed' },
  { id: 16, location: [39.9612, -82.9988], description: 'Charger too slow' },
  { id: 17, location: [37.3382, -121.8863], description: 'Charger offline' },
  { id: 18, location: [33.7490, -84.3880], description: 'Hardware failure' },
  { id: 19, location: [39.9526, -75.1652], description: 'Software update required' },
  { id: 20, location: [32.7157, -117.1611], description: 'No connectivity' }
];

const StyledMapContainer = styled(MapContainer)({
  height: '300px',
  width: '100%',
});

const customIcon = new L.Icon({
  iconUrl: '/charger-icon.png',
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
