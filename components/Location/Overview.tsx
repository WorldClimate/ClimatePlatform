"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'

interface Props {
    location: string
}

export default function Overview({ location }: Props){
    const {isPending, error, data} = useQuery({
        queryKey: ['overview'],
        queryFn: () =>
          fetch(`http://localhost:3000/api/historical?location=${location}&field=overview`).then((res) =>
            res.json(),
          ),
    })
    if (isPending) return <SpinningCircles/>
    if (error) return 'An error has occurred: ' + error.message

    const risks = data.risksAndMitigations.risks.map((risk:any) =>
    <li key={risk.name} className="px-4 py-2 bg-white border-b last:border-none border-black-200"><b>{risk.date} - {risk.name}</b> - {risk.description}</li>);
    const mitigations = data.risksAndMitigations.mitigations.map((mitigation:any) =>
    <li  key={mitigation.name}className="px-4 py-2 bg-white border-b last:border-none border-black-200"><b><a href={mitigation.url}>{mitigation.name}</a></b> - {mitigation.description}</li>);
        
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
            <div>
                <h4>Description</h4>
                <p>{data.locationInformation.description}</p><br/>
            </div>
            <div>
                <h4>History</h4>
                <p>{data.locationInformation.history}</p>
            </div>
            <div className="col-span-2">
                <h4>Top Climate Risk</h4>
                <p><b>{data.risksAndMitigations.topRisk.name}</b></p>
                <p>{data.risksAndMitigations.topRisk.description}</p>
            </div>
            <div>
                <h4>Severe Events Timeline</h4>
                <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{risks}</ul>
            </div>
            <div>
                <h4>Mitigation Activities</h4>
                <ul className="border border-gray-200 rounded overflow-hidden shadow-md">{mitigations}</ul>
            </div>
        </div>
      </div>)
}