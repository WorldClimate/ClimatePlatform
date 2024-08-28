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
import ChartAnalysis from '@/components/Location/ChartAnalysis';

const queryClient = new QueryClient()

export default function LocationPage() {
  const location = useParams().slug.toString()
      return (
      <QueryClientProvider client={queryClient}>
      <section id="main">
      <div className="container mx-auto px-10">
        <Overview location={location}/>
        <div>
          <section className="box features py-10">
            <h2 className="major"><span>Climate Projections & Analysis</span></h2>
          </section>
        </div>
        <div className="outer content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20">
          <div className="charting-overview">
            <div className="charting-block">
              <WCLineChart chartInfo={{
                  title:'Max Yearly Temperature (C)',
                  xAxisKey:'year',
                  xAxisLabel:'Year',
                  yAxisKey:'tempmax',
                  yAxisLabel:'Max Temperature',
                  lineOneName:'10 Year Rolling Avg',
                  lineOneDataKey:'10_year_rolling_avg',
                  lineTwoName:'Annual Max Temp',
                  lineTwoDataKey:'tempmax'
                }} location={location} field="tempmax" />
            </div>
            <ChartAnalysis location={location} query_type="tempmax"/>
          </div>
          <div className="charting-overview">
            <div className="charting-block">
              <WCLineChart chartInfo={{
                  title:'Minimum Yearly Temperature (C)',
                  xAxisKey:'year',
                  xAxisLabel:'Year',
                  yAxisKey:'tempmin',
                  yAxisLabel:'Min Temperature',
                  lineOneName:'10 Year Rolling Avg',
                  lineOneDataKey:'10_year_rolling_avg',
                  lineTwoName:'Annual Min Temp',
                  lineTwoDataKey:'tempmin'
                }} location={location} field="tempmin" />
            </div>
            <ChartAnalysis location={location} query_type="tempmin"/>
          </div>
          <div className="charting-overview">
            <div className="charting-block">
                <WCLineChart chartInfo={{
                    title:'Cumulative Yearly Precip (mm)',
                    xAxisKey:'year',
                    xAxisLabel:'Year',
                    yAxisKey:'precip',
                    yAxisLabel:'Annual Precip (mm)',
                    lineOneName:'10 Year Rolling Avg',
                    lineOneDataKey:'10_year_rolling_avg',
                    lineTwoName:'Annual Precip (mm)',
                    lineTwoDataKey:'precip'
                  }} location={location} field="precip" />
              </div>
              <ChartAnalysis location={location} query_type="precip"/>
          </div>
          <div className="charting-overview">
            <div className="charting-block">
                <WCLineChart chartInfo={{
                    title:'Yearly Average Dew Point (C)',
                    xAxisKey:'year',
                    xAxisLabel:'Year',
                    yAxisKey:'dew',
                    yAxisLabel:'Yearly Average Dew Point (C)',
                    lineOneName:'10 Year Rolling Avg',
                    lineOneDataKey:'10_year_rolling_avg',
                    lineTwoName:'Yearly Average Dew Point (C)',
                    lineTwoDataKey:'dew'
                  }} location={location} field="dew" />
              </div>
              <ChartAnalysis location={location} query_type="dew"/>
          </div>
          {/* <div className="charting-overview">
            <div className="charting-block">
                <WCBarChart chartInfo={
                  {
                    title:'# Days Above 80F (26.7C)',
                    xAxisKey:'year',
                    xAxisLabel:'Year',
                    yAxisKey:'num_days_above_80',
                    yAxisLabel:'# Days Above 80F',
                    barDataKey:'num_days_above_80'
                  }
                } location={location} field="num_days_above_80" />
              </div>
              <ChartAnalysis location={location} query_type="num_days_above_80"/>
          </div> */}
          <div className="charting-overview">
            <div className="charting-block">
                <WCBarChart chartInfo={
                  {
                    title:'# Days Above 90F (32.2C)',
                    xAxisKey:'year',
                    xAxisLabel:'Year',
                    yAxisKey:'num_days_above_90',
                    yAxisLabel:'# Days Above 90F',
                    barDataKey:'num_days_above_90'
                  }
                } location={location} field="num_days_above_90" />
              </div>
            <ChartAnalysis location={location} query_type="num_days_above_90"/>
          </div>
          <div className="charting-overview">
            <div className="charting-block">
              <WCBarChart chartInfo={
                {
                  title:'# Days Above 100F (37.8C)',
                  xAxisKey:'year',
                  xAxisLabel:'Year',
                  yAxisKey:'num_days_above_100',
                  yAxisLabel:'# Days Above 100F',
                  barDataKey:'num_days_above_100'
                }
              } location={location} field="num_days_above_100" />
            </div>
            <ChartAnalysis location={location} query_type="num_days_above_100"/>
          </div>
        </div>
</div>
</section>
</QueryClientProvider>
    );
}