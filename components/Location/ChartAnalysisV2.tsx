"use client";
import React from 'react';

interface Props {
    summary: string
}   

export default function ChartAnalysisV2({summary}: Props){
    const results = JSON.parse(summary);
    console.log(results)
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