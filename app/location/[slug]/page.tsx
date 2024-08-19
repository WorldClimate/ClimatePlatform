"use client";

import React from 'react';
import { useParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import WCLineChart from '@/components/Location/WCLineChart';
import WCBarChart from '@/components/Location/WCBarChart';
import Overview from '@/components/Location/Overview';

const queryClient = new QueryClient()

export default function LocationPage() {
  const location = useParams().slug.toString()
      return (
      <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-10">
        <Overview location={location}/>
        <div className="grid grid-cols-3 py-20">
          <WCLineChart chartInfo={{
              title:'Avg Yearly Max Temperature',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'tempmax',
              yAxisLabel:'Max Temperature',
              lineOneName:'10 Year Rolling Avg',
              lineOneDataKey:'10_year_rolling_avg',
              lineTwoName:'Annual Max Temp',
              lineTwoDataKey:'tempmax'
            }} location={location} field="tempmax" />
          <WCLineChart chartInfo={{
              title:'Avg Yearly Minimum Temperature',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'tempmin',
              yAxisLabel:'Min Temperature',
              lineOneName:'10 Year Rolling Avg',
              lineOneDataKey:'10_year_rolling_avg',
              lineTwoName:'Annual Min Temp',
              lineTwoDataKey:'tempmin'
            }} location={location} field="tempmin" />
          <WCLineChart chartInfo={{
              title:'Cumulative Annual Precip',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'precip',
              yAxisLabel:'Annual Precip (mm)',
              lineOneName:'10 Year Rolling Avg',
              lineOneDataKey:'10_year_rolling_avg',
              lineTwoName:'Annual Precip (mm)',
              lineTwoDataKey:'precip'
            }} location={location} field="precip" />
          <WCBarChart chartInfo={
            {
              title:'Number of Days Above 80f',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'num_days_above_80',
              yAxisLabel:'# Days Above 80f',
              barDataKey:'num_days_above_80'
            }
          } location={location} field="num_days_above_80" />
          <WCBarChart chartInfo={
            {
              title:'Number of Days Above 90f',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'num_days_above_90',
              yAxisLabel:'# Days Above 90f',
              barDataKey:'num_days_above_90'
            }
          } location={location} field="num_days_above_90" />
          <WCBarChart chartInfo={
            {
              title:'Number of Days Above 100f',
              xAxisKey:'year',
              xAxisLabel:'Year',
              yAxisKey:'num_days_above_100',
              yAxisLabel:'# Days Above 100f',
              barDataKey:'num_days_above_100'
            }
          } location={location} field="num_days_above_100" />
        </div>
</div>
</QueryClientProvider>
    );
}