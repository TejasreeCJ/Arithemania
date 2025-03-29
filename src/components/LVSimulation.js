import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LVSimulation = ({ reserveData, width, height }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={reserveData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          label={{ 
            value: 'Time (months)', 
            position: 'bottom', 
            offset: 0 
          }}
        />
        <YAxis 
          yAxisId="left"
          label={{ 
            value: 'Population', 
            angle: -90, 
            position: 'insideLeft',
            offset: 10
          }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          domain={[0, 1]}
          label={{ 
            value: 'NDVI', 
            angle: 90, 
            position: 'insideRight',
            offset: 10
          }}
        />
        <Tooltip />
        <Legend 
          verticalAlign="top" 
          height={36}
          wrapperStyle={{
            paddingBottom: '20px'
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="prey"
          stroke="#4CAF50"
          name="Prey Population"
          dot={false}
          strokeWidth={2}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="predator"
          stroke="#F44336"
          name="Tiger Population"
          dot={false}
          strokeWidth={2}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ndvi"
          stroke="#2196F3"
          name="NDVI"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LVSimulation; 