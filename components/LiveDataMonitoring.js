import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ScrollBox = styled(Box)({
  maxHeight: '200px', // Adjust the max height as needed
  overflowY: 'scroll',
  borderRadius: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  fontFamily: 'monospace',
});

const liveData = [
  { sensor: 'Oxygen Sensor', value: '0.85V' },
  { sensor: 'Throttle Position', value: '25%' },
  { sensor: 'Airflow Sensor', value: '120 g/s' },
  { sensor: 'Engine RPM', value: '1500 RPM' },
  { sensor: 'Engine Load', value: '55%' },
  { sensor: 'Coolant Temperature', value: '90°C' },
  { sensor: 'Fuel Pressure', value: '45 psi' },
  { sensor: 'Battery Voltage', value: '13.8V' },
];

const LiveDataMonitoring = () => (
  <ScrollBox>
    <Typography variant="h6" align="center" gutterBottom>
      Live Data Monitoring
    </Typography>
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Sensor</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {liveData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.sensor}</TableCell>
              <TableCell>{data.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </ScrollBox>
);

export default LiveDataMonitoring;
