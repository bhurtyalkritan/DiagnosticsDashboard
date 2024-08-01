import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const TerminalBox = styled(Box)({
  backgroundColor: '#000',
  color: '#0f0',
  padding: '10px',
  fontFamily: 'monospace',
  maxHeight: '200px', // Adjust the max height as needed
  overflowY: 'scroll',
  borderRadius: '10px',
});

const StatusMessages = ({ messages }) => (
  <TerminalBox>
    {messages.map((message, index) => (
      <Typography key={index} variant="body2">
        {message.timestamp}: {message.alert_message}
      </Typography>
    ))}
  </TerminalBox>
);

export default StatusMessages;
