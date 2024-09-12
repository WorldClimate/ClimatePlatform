"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, } from 'recharts';
import { getBarChartInfo } from '@/lib/chart_info_util'
interface Props {
    query_type: string,
    chartData: any
}

export default function WCBarChart({chartData, query_type}: Props) {
    const chartWidth = 600;
    const chartInfo = getBarChartInfo(query_type)
        return (
            <ResponsiveContainer width={chartWidth} height="100%">
                <BarChart data={chartData}>
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