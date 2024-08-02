import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem, Box, Paper } from '@mui/material';

const endpoints = [
  { value: 'http://127.0.0.1:8001/voltage?records=100', label: 'GET Voltage Data', method: 'GET' },
  { value: 'http://127.0.0.1:8001/voltage/alerts', label: 'GET Voltage Alerts', method: 'GET' },
  { value: 'http://127.0.0.1:8001/vehicle/types', label: 'GET Vehicle Types', method: 'GET' },
  { value: 'http://127.0.0.1:8001/vehicle/specs', label: 'GET Vehicle Specs', method: 'GET' },
  {
    value: 'http://127.0.0.1:8001/voltage/threshold',
    label: 'POST Set Voltage Threshold',
    method: 'POST',
    template: JSON.stringify({ lower_bound: 11.0, upper_bound: 15.0 }, null, 2)
  }
];

const CommandLine = ({ command, response }) => {
  return (
    <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#000', color: '#0f0', marginTop: '20px' }}>
      <Typography variant="body2" component="pre" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {command}
        {response && `\n\n${response}`}
      </Typography>
    </Paper>
  );
};

const TestCard = () => {
  const [endpoint, setEndpoint] = useState(endpoints[0].value);
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState('');
  const [method, setMethod] = useState(endpoints[0].method);
  const [command, setCommand] = useState('');

  const handleEndpointChange = (e) => {
    const selectedEndpoint = endpoints.find((ep) => ep.value === e.target.value);
    setEndpoint(selectedEndpoint.value);
    setMethod(selectedEndpoint.method);
    setJsonInput(selectedEndpoint.method === 'POST' ? selectedEndpoint.template : '');
    setResponse('');
    setCommand('');
  };

  const handleTest = () => {
    let commandStr = '';
    let fakeResponse = '';

    if (method === 'GET') {
      commandStr = `curl -X GET "${endpoint}"`;
      fakeResponse = '{"data": "This is a fake GET response"}';
    } else {
      commandStr = `curl -X POST "${endpoint}" -H "Content-Type: application/json" -d '${jsonInput}'`;
      fakeResponse = '{"data": "This is a fake POST response"}';
    }

    setResponse(fakeResponse);
    setCommand(commandStr);
  };

  return (
    <Box>
      <TextField
        select
        label="API Endpoint"
        value={endpoint}
        onChange={handleEndpointChange}
        fullWidth
        margin="normal"
      >
        {endpoints.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {method === 'POST' && (
        <TextField
          label="JSON Input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          multiline
          fullWidth
          margin="normal"
        />
      )}
      <Button variant="contained" color="primary" onClick={handleTest} fullWidth>
        Test API
      </Button>
      {command && <CommandLine command={command} response={response} />}
    </Box>
  );
};

export default TestCard;
