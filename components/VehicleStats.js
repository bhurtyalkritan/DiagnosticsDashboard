import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ScrollBox = styled(Box)({
  maxHeight: '200px', // Adjust the max height as needed
  overflowY: 'scroll',
  borderRadius: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  fontFamily: 'monospace',
});

const VehicleStats = ({ data }) => (
  <ScrollBox>
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Horsepower</TableCell>
            <TableCell>Torque (lb-ft)</TableCell>
            <TableCell>Weight (lbs)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.vehicle_type}</TableCell>
              <TableCell>{row.horsepower}</TableCell>
              <TableCell>{row.torque}</TableCell>
              <TableCell>{row.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </ScrollBox>
);

export default VehicleStats;
