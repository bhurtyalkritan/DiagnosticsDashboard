import React, { useState } from 'react';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

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

const TestCard = () => {
  const [endpoint, setEndpoint] = useState(endpoints[0].value);
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [method, setMethod] = useState(endpoints[0].method);

  const handleEndpointChange = (e) => {
    const selectedEndpoint = endpoints.find((ep) => ep.value === e.target.value);
    setEndpoint(selectedEndpoint.value);
    setMethod(selectedEndpoint.method);
    setJsonInput(selectedEndpoint.method === 'POST' ? selectedEndpoint.template : '');
    setResponse('');
    setError('');
  };

  const handleTest = async () => {
    try {
      let res;
      if (method === 'GET') {
        res = await axios.get(endpoint);
      } else {
        res = await axios.post(endpoint, JSON.parse(jsonInput));
      }
      setResponse(JSON.stringify(res.data, null, 2));
      setError('');
    } catch (err) {
      setResponse('');
      setError(err.message);
    }
  };

  return (
    <div>
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
      {method === 'GET' && response && (
        <TextField
          label="Response Data"
          value={response}
          multiline
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleTest} fullWidth>
        Test API
      </Button>
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TestCard;
