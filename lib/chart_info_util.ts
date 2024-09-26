import { title } from "process";

const lineChartInfo: { [key: string]: {
    title: string;
    xAxisKey: string;
    xAxisLabel: string;
    yAxisKey: string;
    yAxisLabel: string;
    lineOneName: string;
    lineOneDataKey: string;
    lineTwoName: string;
    lineTwoDataKey: string;
}} = {
    tempmax:{
        title:'Max Yearly Temperature (C)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'tempmax',
        yAxisLabel:'Max Temperature',
        lineOneName:'10 Year Rolling Avg',
        lineOneDataKey:'10_year_rolling_avg',
        lineTwoName:'Annual Max Temp',
        lineTwoDataKey:'tempmax'

    },
    tempmin:{
        title:'Minimum Yearly Temperature (C)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'tempmin',
        yAxisLabel:'Min Temperature',
        lineOneName:'10 Year Rolling Avg',
        lineOneDataKey:'10_year_rolling_avg',
        lineTwoName:'Annual Min Temp',
        lineTwoDataKey:'tempmin'
    },
   precip:{
        title:'Cumulative Yearly Precip (mm)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'precip',
        yAxisLabel:'Annual Precip (mm)',
        lineOneName:'10 Year Rolling Avg',
        lineOneDataKey:'10_year_rolling_avg',
        lineTwoName:'Annual Precip (mm)',
        lineTwoDataKey:'precip'
    },
    dew:{
        title:'Yearly Average Dew Point (C)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'dew',
        yAxisLabel:'Yearly Average Dew Point (C)',
        lineTwoName:'10 Year Rolling Avg',
        lineTwoDataKey:'10_year_rolling_avg',
        lineOneName:'Yearly Average Dew Point (C)',
        lineOneDataKey:'dew'
    }
}

const barChartInfo: { [key: string]: {
    title: string;
    xAxisKey: string;
    xAxisLabel: string;
    yAxisKey: string;
    yAxisLabel: string;
    barDataKey: string;
}} = {
    num_days_above_90:{
        title:'# Days Above 90F (32.2C)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'num_days_above_90',
        yAxisLabel:'# Days Above 90F',
        barDataKey:'num_days_above_90'
    },
    num_days_above_100:{
        title:'# Days Above 100F (37.8C)',
        xAxisKey:'year',
        xAxisLabel:'Year',
        yAxisKey:'num_days_above_100',
        yAxisLabel:'# Days Above 100F',
        barDataKey:'num_days_above_100'
    },
}

export function getLineChartInfo(query_type: string) {
    return lineChartInfo[query_type]
}

export function getBarChartInfo(query_type: string) {
    return barChartInfo[query_type]
}