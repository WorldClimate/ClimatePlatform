
"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation'
import { createTrend } from 'trendline';

export default function LocationPage() {
  const dataRef = React.useRef(null);
  const [chartData, setChartData] = React.useState<{ data: { tempmax: number; datetime: number }[] }>({ data: [] });
  const location = useParams().slug;

  /* 
    This request should be cached until manually invalidated.
    Similar to `getStaticProps`.
    `force-cache` is the default and can be omitted.
  */
  const staticData = fetch(`http://localhost:3000/api/historical?location=${location}&field=tempmax`, { cache: "no-cache" });
  if(chartData.data.length === 0){
    staticData.then(async (res) => {
      const data = await res.json();
      Promise.all([setChartData(data)]);
    });
}
    // const maxtemps = chartData.data.map((data) => data.tempmax);
    // const yMax = Math.max(...maxtemps);
    // const yMin = Math.min(...maxtemps);
    // const timestamps = chartData.data.map((data) => data.datetime);
    // console.log('Timestamps - '+ timestamps)
    // const xMax = Math.max(...timestamps);
    // const xMin = Math.min(...timestamps);
    // const trendData = () => {
    //   const trend = createTrend(chartData.data, 'datetime', 'tempmax');
    //   console.log('Trend - '+trend.calcY(xMin) + ' - '+trend.calcY(xMax));
    //   return [``
    //     { tempmax: trend.calcY(xMin), datetime: xMin },
    //     { tempmax: trend.calcY(xMax), datetime: xMax },
    //   ];
    // };
  // const content = JSON.parse(fs.readFileSync('data/oxford/oxford_tempmax_monthly_projected_v6.json', { encoding: 'utf-8' }));
      console.log("Rerendering with - "+chartData.data.length+" data points")
      return (<div style={({display:'flex', alignItems:'center', justifyContent:'center'})}>
        <LineChart width={1200} height={600} data={chartData.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
          <XAxis name="Year" dataKey="datetime"/>
          <YAxis name="Max Temperature" dataKey="tempmax"/>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="tempmax" stroke="#ff7300" yAxisId={0} />
          {/* <Line
            data={trendData()}
            dataKey="tempmax"
            stroke="red"
            strokeDasharray="3 3"
          /> */}
        </LineChart>
      </div>
    );
}
