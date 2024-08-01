// components/LiveBugChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
  height: '100%',
});

const initialData = [
  { time: '00:00', bugs: 0 },
  { time: '00:01', bugs: 1 },
  { time: '00:02', bugs: 2 },
];

const LiveBugChart = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newTime = new Date().toLocaleTimeString();
        const newBugs = Math.floor(Math.random() * 10);

        return [...prevData.slice(1), { time: newTime, bugs: newBugs }];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bugs" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </StyledContainer>
  );
};

export default LiveBugChart;
