"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'
import { createTrend } from 'trendline';

interface Props {
    chartInfo: {
        title: string,
        yAxisKey: string,
        xAxisKey: string,
        yAxisLabel: string,
        xAxisLabel: string,
        lineOneName: string,
        lineOneDataKey: string,
        lineTwoName: string,
        lineTwoDataKey: string
    }
    location: string
    field: string
}

export default function Chart({chartInfo, location, field}: Props) {
    const chartWidth = 450;
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
                <LineChart width={chartWidth} height={300} data={data.data} margin={{ top: 50, right: 20, left: 10, bottom: 50 }}>
                    <text x={chartWidth / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan fontFamily="Open Sans" fontSize="18">{chartInfo.title}</tspan>
                    </text>
                    <XAxis name={chartInfo.xAxisLabel} dataKey={chartInfo.xAxisKey} />
                    <YAxis name={chartInfo.yAxisLabel} dataKey={chartInfo.yAxisKey} />
                    <Tooltip position={{x:50,y:-100}} viewBox={{ x: 0, y: 0, width: 500, height: 20 }}/>
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line name={chartInfo.lineOneName} type="monotone" dataKey={chartInfo.lineOneDataKey} stroke="#ff7300" yAxisId={0} dot={false}/>
                    <Line name={chartInfo.lineTwoName} opacity={0.25} type="monotone" dataKey={chartInfo.lineTwoDataKey} stroke="#7bb08a" yAxisId={0} dot={false}/>
                    <ReferenceLine x={2024} label="2024" />
                    </LineChart>
            );
}