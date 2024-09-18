"use client";
import React from 'react';
import WCLineChart from '@/components/Location/WCLineChart';
import WCBarChart from '@/components/Location/WCBarChart';
import ChartAnalysis from '@/components/Location/ChartAnalysis';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'
import Collapsible from 'react-collapsible';
import { BsChevronDown } from "react-icons/bs"; //react-icon

interface Props {
  country_name: string,
  city_name: string
}

export default function Overview({ country_name, city_name  }: Props){
    const {isPending, error, data} = useQuery({
        queryKey: ['overview'],
        queryFn: () =>
          fetch(`/api/historical?city_name=${city_name}&country_name=${country_name}&field=overview`).then((res) =>
            res.json(),
          ),
    })
    if (isPending) return <SpinningCircles/>
    if (error) return 'An error has occurred: ' + error.message

    const risks = data.risksAndMitigations.risks.map((risk:any) =>
    <li key={risk.name} className="px-4 py-2 bg-white border-b last:border-none border-black-200">
        <Collapsible key={risk.name}  trigger={new Date(risk.date).getFullYear()+": "+risk.name}>
            <p>{risk.description}</p>
        </Collapsible>
    </li>);
    const mitigations = data.risksAndMitigations.mitigations.map((mitigation:any) =>
    <li key={mitigation.name}className="px-4 py-2 bg-white border-b last:border-none border-black-200">
        <Collapsible key={mitigation.name} trigger={mitigation.name}>
        {/* {mitigation.url ? <b><a target="_blank" rel="noopener noreferrer" href={mitigation.url}>Link</a></b> : ""} */}
        <p>{mitigation.description}</p>
        </Collapsible>
    </li>);
        
    return (
    <div >
      <div className="col-span-2">
        <section className="box features pt-10">
          <h2 className="major"><span>{city_name.replace('-', ' ')}</span></h2>
        </section>
      </div>
      <div className="container m-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
            <img src={`/images/locations/${city_name}/overview.jpg`}/>
        </div>
        <div>
          <h4>Key Geopolitical Facts</h4>
              <p>
                  <b>Population</b> - {data.locationInformation.population}<br/>
                  <b>Altitude</b> - {data.locationInformation.altitude} meters<br/> 
                  <b>Industries</b> - {data.locationInformation.industries.map((industry: any) => industry).join(", ")}
              </p>
              <br/>
          <h4>Weather</h4>
          <p>{data.locationInformation.weather}</p>
        </div>
      </div>
      <section className="box features pt-10">
        <h2 className="major"><span>Climate Projections & Analysis</span></h2>
      </section>
      <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-4 justify-content-center">
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
              }} country_name={country_name} city_name={city_name} field="tempmax" />
          </div>
          <ChartAnalysis country_name={country_name} city_name={city_name} query_type="tempmax"/>
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
              }} country_name={country_name} city_name={city_name} field="tempmin" />
          </div>
          <ChartAnalysis country_name={country_name} city_name={city_name}  query_type="tempmin"/>
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
                }} country_name={country_name} city_name={city_name}  field="precip" />
            </div>
            <ChartAnalysis country_name={country_name} city_name={city_name}  query_type="precip"/>
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
                }} country_name={country_name} city_name={city_name}  field="dew" />
            </div>
            <ChartAnalysis country_name={country_name} city_name={city_name}  query_type="dew"/>
        </div>
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
              } country_name={country_name} city_name={city_name}  field="num_days_above_90" />
            </div>
          <ChartAnalysis country_name={country_name} city_name={city_name}  query_type="num_days_above_90"/>
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
            } country_name={country_name} city_name={city_name}  field="num_days_above_100" />
          </div>
          <ChartAnalysis country_name={country_name} city_name={city_name}  query_type="num_days_above_100"/>
        </div>
      </div>
      <section className="box features pt-10">
          <h2 className="major"><span>Top Climate Risk</span></h2>
      </section>
      <div className="container mx-auto">
              <p><b>{data.risksAndMitigations.topRisk.name}</b></p>
              <p>{data.risksAndMitigations.topRisk.description}</p>
          </div>
      <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 justify-content-center">
          <div className="pt-10">
              <h4>Severe Events Timeline</h4>
              <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{risks}</ul>
          </div>
          <div className="pt-10">
              <h4>Mitigation Activities</h4>
              <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{mitigations}</ul>
          </div>    
        </div>
      </div>)
}