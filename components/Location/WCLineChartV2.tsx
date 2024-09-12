"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'
import { getLineChartInfo } from '@/lib/chart_info_util'

interface Props {
    query_type: string,
    chartData: any
}

export default function Chart({chartData, query_type}: Props) {
    const chartWidth = 600;
    const chartInfo = getLineChartInfo(query_type)
    console.log(chartData)
            return (
                <ResponsiveContainer width={chartWidth} height="100%">
                    <LineChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <text x={chartWidth / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
                        <tspan fontFamily="Open Sans" fontSize="18">{chartInfo.title}</tspan>
                    </text>
                    <XAxis name={chartInfo.xAxisLabel} dataKey={chartInfo.xAxisKey} />
                    <YAxis name={chartInfo.yAxisLabel} dataKey={chartInfo.yAxisKey} />
                    <Tooltip position={{x:50,y:-125}} viewBox={{ x: 0, y: 0, width: 500, height: 20 }}/>
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line name={chartInfo.lineOneName} type="monotone" dataKey={chartInfo.lineOneDataKey} stroke="#ff7300" yAxisId={0} dot={false}/>
                    <Line name={chartInfo.lineTwoName} opacity={0.25} type="monotone" dataKey={chartInfo.lineTwoDataKey} stroke="#7bb08a" yAxisId={0} dot={false}/>
                    {/* <ReferenceLine x={2024} label="2024" /> */}
                    </LineChart>
                </ResponsiveContainer>
            );
}