"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
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
    // const hostname =
    const { isPending, error, data } = useQuery({
        queryKey: [field],
        queryFn: () =>
          fetch(`/api/historical?location=${location}&field=${field}`).then((res) =>
            res.json(),
          ),
      })
      if (isPending) return <SpinningCircles/>
        if (error) return 'An error has occurred: ' + error.message
        return (
            <ResponsiveContainer width={chartWidth} height="80%">
                <BarChart width={chartWidth} height={300} data={data.data}>
                    <XAxis dataKey={chartInfo.xAxisKey}/>
                    <YAxis dataKey={chartInfo.yAxisKey}/>
                    <text x={chartWidth / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan fontFamily="Open Sans" fontSize="18">{chartInfo.title}</tspan>
                    </text>
                    <Tooltip position={{x:50,y:-100}} viewBox={{ x: 0, y: 0, width: 500, height: 20 }}/>
                    <Bar dataKey={chartInfo.barDataKey} fill="#7bb08a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
          </ResponsiveContainer>)
        }