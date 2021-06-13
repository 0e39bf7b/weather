import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { format } from "date-fns";

import './index.css';

const shortDateFormatter = timestamp => {
  return format(new Date(timestamp * 1000), 'H:mm');
};

const fullDateFormatter = timestamp => {
  return format(new Date(timestamp * 1000), 'M/dd H:mm');
};

export default function WeatherChart({ title, measurements, dataKey }) {
  return (<>
    <h3>{title}</h3>
    <div className="chart-container">
      <ResponsiveContainer>
        <LineChart data={measurements} >
          <XAxis dataKey="timestamp" tickFormatter={shortDateFormatter} />
          <YAxis type="number" domain={['dataMin', 'dataMax']} />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Tooltip labelFormatter={fullDateFormatter} />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </>);
}
