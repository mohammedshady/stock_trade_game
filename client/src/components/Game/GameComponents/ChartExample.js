import React from "react";
import {
  ComposedChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartExample = ({ prices }) => {
  return (
    <ResponsiveContainer width="100%" height={70}>
      <ComposedChart data={prices} isAnimationActive={false}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" tick={false} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ChartExample;
