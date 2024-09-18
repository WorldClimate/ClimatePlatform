"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'

interface Props {
    country_name: string,
    city_name: string,
    query_type: string
}   

export default function ChartAnalysis({ country_name, city_name,  query_type}: Props){
    const field= 'genai_analysis_'+query_type;
    const {isPending, error, data} = useQuery({
        queryKey: [field],
        queryFn: () =>
          fetch(`/api/historical?country_name=${country_name}&city_name=${city_name}&field=${field}`).then((res) =>
            res.json(),
          ),
    })
    if (isPending) return <SpinningCircles/>
    if (error) return 'An error has occurred: ' + error.message
    const results = JSON.parse(data);
    return(
    <div className="analysis">
        <h4>Analysis</h4>
        <div>
            <p>{results.analysis}</p>
        </div>
        <div className="risks">
            <h4>Risks</h4>
            <p>{results.risks}</p>
        </div>
        <div className="suggestions">
        <h4>Suggestions</h4>
            <ul className="suggestions-list">
                {results.suggestions.map(function(suggestion: string, index: number){
                    if(index<3)
                    return <li className="suggestion" key={index}>{suggestion}</li>;
                })}
            </ul>
        </div>
        </div>)
}