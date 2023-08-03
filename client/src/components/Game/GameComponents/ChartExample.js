import React from 'react';
import { ComposedChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartExample = () => {
  const data = [
    { name: 'January', value: 1000 },
    { name: 'February', value: 1200 },
    { name: 'March', value: 1100 },
    { name: 'April', value: 1300 },
    { name: 'May', value: 1400 },
    { name: 'June', value: 1300 },
    { name: 'July', value: 1500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={100}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ChartExample;
