import React from 'react';
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Legend } from 'recharts';

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
    },
    chartData: any
}

export default function Chart({chartInfo, chartData}: Props) {
    const chartWidth = 600;

    return (
        <div style={{ height: '300px', width: '600px' }}>
            {/* <LineChart data={chartData.data}>
            <XAxis name={chartInfo.xAxisLabel} dataKey={chartInfo.xAxisKey} />
            <YAxis name={chartInfo.yAxisLabel} dataKey={chartInfo.yAxisKey} />
            <Line isAnimationActive={false} name={chartInfo.lineOneName} type="monotone" dataKey={chartInfo.lineOneDataKey} stroke="#ff7300" yAxisId={0} dot={false}/>
            <Line isAnimationActive={false} name={chartInfo.lineTwoName} opacity={0.25} type="monotone" dataKey={chartInfo.lineTwoDataKey} stroke="#7bb08a" yAxisId={0} dot={false}/>
            <ReferenceLine x={2024} label="2024" />
            </LineChart> */}
        </div>
    );
}