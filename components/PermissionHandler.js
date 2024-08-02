// components/PermissionHandler.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontFamily: 'Lexend Deca, sans-serif',
  marginBottom: '20px',
});

const teslaModules = [
  'Battery Management System',
  'Drive Inverter',
  'Autopilot Hardware',
  'Vehicle Control Unit',
  'Power Conversion System'
];

const teslaParts = {
  'Battery Management System': ['Battery Pack', 'Battery Charger', 'Battery Sensor'],
  'Drive Inverter': ['Inverter Module', 'Inverter Cooling System', 'Inverter Control Unit'],
  'Autopilot Hardware': ['Camera', 'Radar', 'Ultrasonic Sensor'],
  'Vehicle Control Unit': ['Main Control Unit', 'Vehicle Communication Module', 'Data Logger'],
  'Power Conversion System': ['DC-DC Converter', 'Onboard Charger', 'Power Distribution Unit']
};

const PermissionHandler = () => {
  const [requesting, setRequesting] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [partName, setPartName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRequestPermission = async () => {
    setRequesting(true);
    setStatusMessage('Requesting permission from Odin...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatusMessage('Permission granted.');
    } catch (error) {
      setStatusMessage('Permission denied.');
    } finally {
      setRequesting(false);
    }
  };

  const handleModuleChange = (event) => {
    setModuleName(event.target.value);
    setPartName(''); // Reset part name when module changes
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom align="center">
        Odin Permission Handler
      </Typography>
      <Typography variant="body2" gutterBottom>
        The Permission Handler requests necessary permissions from Tesla's central service, through Odin, to perform maintenance actions and data transfers on the vehicle. Ensure you have the correct module and part names before proceeding.
      </Typography>
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Module Name</InputLabel>
        <Select
          value={moduleName}
          onChange={handleModuleChange}
          label="Module Name"
        >
          {teslaModules.map((module) => (
            <MenuItem key={module} value={module}>
              {module}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Part Name</InputLabel>
        <Select
          value={partName}
          onChange={(e) => setPartName(e.target.value)}
          label="Part Name"
          disabled={!moduleName}
        >
          {(teslaParts[moduleName] || []).map((part) => (
            <MenuItem key={part} value={part}>
              {part}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRequestPermission}
        disabled={requesting || !moduleName || !partName}
      >
        {requesting ? <CircularProgress size={24} /> : 'Request Permission'}
      </Button>
      {statusMessage && (
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}
    </Container>
  );
};

export default PermissionHandler;
