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

const emissionData = [
  { test: 'Oxygen Sensor Test', result: 'Pass' },
  { test: 'Catalytic Converter Efficiency', result: 'Pass' },
  { test: 'EVAP System Test', result: 'Pass' },
  { test: 'EGR System Test', result: 'Pass' },
  { test: 'Secondary Air Injection System', result: 'Pass' },
  { test: 'Fuel System Test', result: 'Pass' },
];

const EmissionTesting = () => (
  <ScrollBox>
    <Typography variant="h6" align="center" gutterBottom>
      Emission Testing
    </Typography>
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Test</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emissionData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.test}</TableCell>
              <TableCell>{data.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </ScrollBox>
);

export default EmissionTesting;
