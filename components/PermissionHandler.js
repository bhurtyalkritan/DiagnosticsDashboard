// components/PermissionHandler.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  padding: '20px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontFamily: 'Lexend Deca, sans-serif',
  marginBottom: '20px',
});

const PermissionHandler = () => {
  const [requesting, setRequesting] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [partName, setPartName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRequestPermission = async () => {
    setRequesting(true);
    setStatusMessage('Requesting permission from Odin...');
    try {
      // Simulate a call to Odin for permission
      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatusMessage('Permission granted.');
    } catch (error) {
      setStatusMessage('Permission denied.');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom align="center">
        Permission Handler
      </Typography>
      <Typography variant="body2" gutterBottom>
        The Permission Handler requests necessary permissions from Tesla's central service, through Odin, to perform maintenance actions and data transfers on the vehicle. Ensure you have the correct module and part names before proceeding.
      </Typography>
      <TextField
        label="Module Name"
        variant="outlined"
        fullWidth
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Part Name"
        variant="outlined"
        fullWidth
        value={partName}
        onChange={(e) => setPartName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRequestPermission}
        disabled={requesting}
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
