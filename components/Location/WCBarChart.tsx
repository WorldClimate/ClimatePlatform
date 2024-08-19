"use client";

import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'

interface Props {
    chartInfo: {
        title: string,
        yAxisKey: string,
        xAxisKey: string,
        yAxisLabel: string,
        xAxisLabel: string,
        barDataKey: string
    }
    location: string
    field: string
}

export default function WCBarChart({chartInfo, location, field}: Props) {
    const chartWidth = 450;
    const { isPending, error, data } = useQuery({
        queryKey: [field],
        queryFn: () =>
          fetch(`http://localhost:3000/api/historical?location=${location}&field=${field}`).then((res) =>
            res.json(),
          ),
      })
      if (isPending) return <SpinningCircles/>
        if (error) return 'An error has occurred: ' + error.message
        return (<BarChart width={chartWidth} height={300} data={data.data}>
            <XAxis dataKey={chartInfo.xAxisKey}/>
            <YAxis dataKey={chartInfo.yAxisKey}/>
            <text x={chartWidth / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                <tspan fontFamily="Open Sans" fontSize="18">{chartInfo.title}</tspan>
            </text>
            <Tooltip position={{x:50,y:-100}} viewBox={{ x: 0, y: 0, width: 500, height: 20 }}/>
            <Bar dataKey={chartInfo.barDataKey} fill="#7bb08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>)
        }