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
    location: string
}

export default function Overview({ location }: Props){
    const {isPending, error, data} = useQuery({
        queryKey: ['overview'],
        queryFn: () =>
          fetch(`/api/historical?location=${location}&field=overview`).then((res) =>
            res.json(),
          ),
    })
    if (isPending) return <SpinningCircles/>
    if (error) return 'An error has occurred: ' + error.message

    const risks = data.risksAndMitigations.risks.map((risk:any) =>
    <li key={risk.name} className="px-4 py-2 bg-white border-b last:border-none border-black-200">
        <Collapsible trigger={[risk.name, <BsChevronDown />]}>
            <p>{risk.description}</p>
        </Collapsible>
    </li>);
    const mitigations = data.risksAndMitigations.mitigations.map((mitigation:any) =>
    <li key={mitigation.name}className="px-4 py-2 bg-white border-b last:border-none border-black-200">
        <Collapsible trigger={[mitigation.name, <BsChevronDown />]}>
        <b><a href={mitigation.url}>Link</a></b>
        <p>{mitigation.description}</p>
        </Collapsible>
    </li>);
        
    return (
    <div>
        <div>
          <section className="box features py-10">
            <h2 className="major"><span>{location.replace('-', ' ')}</span></h2>
          </section>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-2 gap-4">
            <div>
                <img src={`/images/locations/${location}/overview.jpg`}/>
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
            {/* <div>
                <h4>Description</h4>
                <p>{data.locationInformation.description}</p><br/>
            </div>
            <div>
                <h4>History</h4>
                <p>{data.locationInformation.history}</p>
            </div> */}
        <div className='col-span-2'>
          <section className="box features py-10">
            <h2 className="major"><span>Climate Projections & Analysis</span></h2>
          </section>
        </div>
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
          <div className='col-span-2'>
                <section className="box features py-10">
                    <h2 className="major"><span>Top Climate Risk</span></h2>
                </section>
            </div>
            <div className="col-span-2">
                <p><b>{data.risksAndMitigations.topRisk.name}</b></p>
                <p>{data.risksAndMitigations.topRisk.description}</p>
            </div>
            <div className="py-10">
                <h4>Severe Events Timeline</h4>
                <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{risks}</ul>
            </div>
            <div className="py-10">
                <h4>Mitigation Activities</h4>
                <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{mitigations}</ul>
            </div>
        </div>
      </div>)
}