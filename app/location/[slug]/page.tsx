
"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useParams } from 'next/navigation'
import { createTrend } from 'trendline';

export default function LocationPage() {
  const [maxTempChartData, setMaxTempChartData] = React.useState<{ data: { tempmax: number; datetime: number }[] }>({ data: [] });
  const [minTempChartData, setMinTempChartData] = React.useState<{ data: { tempmin: number; datetime: number }[] }>({ data: [] });
  const location = useParams().slug;

  /* 
    This request should be cached until manually invalidated.
    Similar to `getStaticProps`.
    `force-cache` is the default and can be omitted.
  */
  const tempMaxData = fetch(`http://localhost:3000/api/historical?location=${location}&field=tempmax`, { cache: "no-cache" });
  const tempMinData = fetch(`http://localhost:3000/api/historical?location=${location}&field=tempmin`, { cache: "no-cache" });
  if(maxTempChartData.data.length === 0){
    tempMaxData.then(async (res) => {
      const data = await res.json();
      Promise.all([setMaxTempChartData(data)]);
    });
  }
  if(minTempChartData.data.length === 0){
   tempMinData.then(async (res) => {
      const data = await res.json();
      Promise.all([setMinTempChartData(data)]);
    });
  }
 

      console.log("Rerendering with - "+maxTempChartData.data.length+" data points")
      return (<div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
          <LineChart width={1000} height={600} data={maxTempChartData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="year" />
          <YAxis name="Rolling Average Max Temperature" dataKey="yearly_rolling_avg" label={{ value: 'Rolling Average Max Temperature', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="yearly_rolling_avg" stroke="#ff7300" yAxisId={0} dot={false}/>
          <ReferenceLine x={2024} label="Start of Projection" />
        </LineChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <LineChart width={1000} height={600} data={minTempChartData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="year" />
          <YAxis name="Rolling Average Min Temperature" dataKey="yearly_rolling_avg" label={{ value: 'Rolling Average Min Temperature', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="yearly_rolling_avg" stroke="#ff7300" yAxisId={0} dot={false}/>
          <ReferenceLine x={2024} label="Start of Projection" />
        </LineChart>
        </div>
      </div>
    );
}
