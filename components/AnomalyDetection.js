import React from 'react';
import { Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnomalyDetection({ data }) {
  const anomalies = data.filter((d) => d.status === 'Fault');

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Anomaly Detection
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="voltage" stroke="#8884d8" />
          {anomalies.length > 0 && <Line type="monotone" dataKey="voltage" stroke="red" data={anomalies} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
