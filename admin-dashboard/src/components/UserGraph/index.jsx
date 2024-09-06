import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";


  export default function UserGraph({ TotalUsersByMonth }) {
    const data = Object.entries(TotalUsersByMonth).map(([month, users]) => ({
        month,
        users, 
    }));

    return (
        <AreaChart
          width={1500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" strokeWidth="4px" dataKey="users" stroke="#c0c0ef" fill="#94D7FF" />
        </AreaChart>
      );
  }