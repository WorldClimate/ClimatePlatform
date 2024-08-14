
"use client";

import React from 'react';
import { BarChart, Bar, Rectangle, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'next/navigation'
import { createTrend } from 'trendline';

export default function LocationPage() {
  const [maxTempChartData, setMaxTempChartData] = React.useState<{ data: { tempmax: number; datetime: number }[] }>({ data: [] });
  const [minTempChartData, setMinTempChartData] = React.useState<{ data: { tempmin: number; datetime: number }[] }>({ data: [] });
  const [precipData, setPrecipData] = React.useState<{ data: { precip: number; year: number }[] }>({ data: [] });
  const [numDaysAbove80ChartData, setNumDaysAbove80ChartData] = React.useState<{ data: { num_days_above_80: number; year: number }[] }>({ data: [] });
  const [numDaysAbove90ChartData, setNumDaysAbove90ChartData] = React.useState<{ data: { num_days_above_90: number; year: number }[] }>({ data: [] });
  const [numDaysAbove100ChartData, setNumDaysAbove100ChartData] = React.useState<{ data: { num_days_above_100: number; year: number }[] }>({ data: [] });
  const location = useParams().slug;

  /* 
    This request should be cached until manually invalidated.
    Similar to `getStaticProps`.
    `force-cache` is the default and can be omitted.
  */
  const tempMaxDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=tempmax`, { cache: "no-cache" });
  const tempMinDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=tempmin`, { cache: "no-cache" });
  const precipDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=precip`, { cache: "no-cache" });
  const numDaysAbove80ChartDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=num_days_above_80`, { cache: "no-cache" });
  const numDaysAbove90ChartDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=num_days_above_90`, { cache: "no-cache" });
  const numDaysAbove100ChartDTO = fetch(`http://localhost:3000/api/historical?location=${location}&field=num_days_above_100`, { cache: "no-cache" });

  if(maxTempChartData.data.length === 0){
    tempMaxDTO.then(async (res) => {
      const data = await res.json();
      Promise.all([setMaxTempChartData(data)]);
    });
  }
  if(minTempChartData.data.length === 0){
    tempMinDTO.then(async (res) => {
      const data = await res.json();
      Promise.all([setMinTempChartData(data)]);
    });
  }
  if(precipData.data.length === 0){
    precipDTO.then(async (res) => {
      const data = await res.json();
      Promise.all([setPrecipData(data)]);
    });
  }

  if(numDaysAbove80ChartData.data.length === 0){
    numDaysAbove80ChartDTO.then(async (res) => {
       const data = await res.json();
       Promise.all([setNumDaysAbove80ChartData(data)]);
     });
   }
   
   if(numDaysAbove90ChartData.data.length === 0){
    numDaysAbove90ChartDTO.then(async (res) => {
       const data = await res.json();
       Promise.all([setNumDaysAbove90ChartData(data)]);
     });
   }

   if(numDaysAbove100ChartData.data.length === 0){
    numDaysAbove100ChartDTO.then(async (res) => {
       const data = await res.json();
       Promise.all([setNumDaysAbove100ChartData(data)]);
     });
   }
      return (<div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
          <LineChart width={1000} height={600} data={maxTempChartData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="year" />
          <YAxis name="Max Temperature" dataKey="tempmax" label={{ value: 'Max Temperature', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="10_year_rolling_avg" stroke="#ff7300" yAxisId={0} dot={false}/>
          <Line opacity={0.4} type="monotone" dataKey="tempmax" stroke="#7bb08a" yAxisId={0} dot={false}/>
          <ReferenceLine x={2024} label="Start of Projection" />
          <Legend />
        </LineChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <LineChart width={1000} height={600} data={minTempChartData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="year" />
          <YAxis name="Min Temperature" dataKey="tempmin" label={{ value: 'Min Temperature', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="10_year_rolling_avg" stroke="#ff7300" yAxisId={0} dot={false}/>
          <Line opacity={0.4} type="monotone" dataKey="tempmin" stroke="#7bb08a" yAxisId={0} dot={false}/>
          <ReferenceLine x={2024} label="Start of Projection" />
          <Legend />
        </LineChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <LineChart width={1000} height={600} data={precipData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="year" />
          <YAxis name="Cumulative Annual Precipitation" dataKey="precip" label={{ value: 'Cumulative Annual Precipitation', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="10_year_rolling_avg" stroke="#ff7300" yAxisId={0} dot={false}/>
          <Line opacity={0.4} type="monotone" dataKey="precip" stroke="#7bb08a" yAxisId={0} dot={false}/>
          <ReferenceLine x={2024} label="Start of Projection" />
          <Legend />
        </LineChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <BarChart
          width={1000}
          height={600}
          data={numDaysAbove80ChartData.data}>
          <XAxis dataKey="year"/>
          <YAxis dataKey="num_days_above_80" label={{ value: '# days above 80f', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="num_days_above_80" fill="#7bb08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <BarChart
          width={1000}
          height={600}
          data={numDaysAbove90ChartData.data}>
          <XAxis dataKey="year"/>
          <YAxis dataKey="num_days_above_90" label={{ value: '# days above 90f', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="num_days_above_90" fill="#7bb08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>
        <div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <BarChart
          width={1000}
          height={600}
          data={numDaysAbove100ChartData.data}>
          <XAxis dataKey="year"/>
          <YAxis dataKey="num_days_above_100" label={{ value: '# days above 100f', angle: -90, position: 'insideLeft' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="num_days_above_100" fill="#7bb08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>
      </div>
    );
}