"use client";
import React from 'react';
import WCLineChartV2 from '@/components/Location/WCLineChartV2';
import WCBarChartV2 from '@/components/Location/WCBarChartV2';
import ChartAnalysisV2 from '@/components/Location/ChartAnalysisV2';
import { useQuery } from '@tanstack/react-query'
import Image from "next/image";
import { useRouter } from 'next/router';
import { usePDF } from 'react-to-pdf';

interface Props {
    city_name: string,
    country_name: string,
    industry: string,
    company_name: string,
    mock_data: boolean
}

export default function ReportOverview(Props: Props) {
  const city_name = Props.city_name || "Not Provided"
  const country_name = Props.country_name || "Not Provided"
  const industry = Props.industry || "Not Provided"
  const company_name = Props.company_name|| "Not Provided"
  const mock_data = Props.mock_data || false
  const router = useRouter();
  const handleBack = () => {
    router.push('/report');
  };

  // const hostname = process.env.NEXT_PUBLIC_RISKAI_HOST
    const hostname = "https://walrus-app-24aml.ondigitalocean.app"
    const pdfName = `TheWorldClimate Risk Analysis - ${company_name}.pdf`
    const { toPDF, targetRef } = usePDF({filename: pdfName});
    var location = {
      city_name: city_name,
      country_name: country_name
    }
    const {isPending, error, data} = useQuery({
        queryKey: ['report'],
        queryFn: () =>
        fetch(`${hostname}/generate`, {
                signal: AbortSignal.timeout(60000),
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({location:location, industry: industry, secret: "magic", mock: mock_data})
        }).then((res) =>
            
            res.json(),
         ),
    })
    if (isPending) return <div><img src="/images/loading-spinner.svg" className="m-auto"/><br/><h3 className='text-center'>LOADING...</h3></div>
    if (error) return 'An error has occurred: ' + error.message
    const riskMitigationData = data.risk_results;
    const mitigations = riskMitigationData.map((result:any) =>
      <div key={result.risk} className="border-solid px-4 py-2 bg-white border-b last:border-none border-black-200">
       <div className="my-5"><b>Risk</b> - {result.risk}</div>
       {/* <div className="my-5"><b>Impact</b> - {result.impact}</div> */}
       <div className="my-5"><b>Mitigation</b> - {result.mitigation}</div>
       <div className="my-5"><b>Opportunities</b>
        {result.opportunities.map((opportunity:any) => (
          <li key={opportunity} className='list-inside list-disc'>{removeNumberDot(opportunity)}</li>
        ))}</div>
      </div>);

    const line_charts = data.locations_results.analyses.map((analysis:any) =>
      analysis.query_type.chart_type === 'line' ?
      <div key={analysis.query_type.name} className="charting-overview">
          <div className="charting-block">
            <WCLineChartV2 chartData={JSON.parse(analysis.climate_data).data} query_type={analysis.query_type.name}/>
          </div>
          <ChartAnalysisV2 summary={analysis.summary}/>
        </div> : ""
      );
    const bar_charts = data.locations_results.analyses.map((analysis:any) =>
      analysis.query_type.chart_type === 'bar' ?
      <div key={analysis.query_type.name} className="charting-overview">
          <div className="charting-block">
          <WCBarChartV2 chartData={JSON.parse(analysis.climate_data).data} query_type={analysis.query_type.name} />
          </div>
          <ChartAnalysisV2 summary={analysis.summary}/>
        </div> : ""
      );

    return (
    <div>
      <button className="outline-black outline text-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 m-5" onClick={() => toPDF()}>Download PDF</button>
      <button className="outline-black outline text-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 m-5" onClick={() => handleBack()}>Generate New</button>
      <div ref={targetRef}>
          <div  className="col-span-2">
            <header className='text-center py-10'>
          <div className="flex justify-center items-center">          
              <Image
            src={"/images/logo-transparent copy.png"}
            alt="logo"
            width={128}
            height={128}
            className="w-32 h-32"/>
            
          </div>
          <h1 className="py-10 text-4xl font-bold text-center">TheWorldClimate RiskAI Analysis</h1>
          <h1 className="text-4xl font-bold text-center">{company_name}</h1>
        </header>
        <section className="box features pt-10">
          <h2 className="major"><span>Overview</span></h2>
          <div className="text-center">
            <h3>Company: {company_name}</h3><br/>
            <h3>Industry: {industry}</h3><br/>
            <h3>GICS SubIndustry: {data.industry_info.subindustry}</h3><br/>
            <p className='pb-10'>{data.industry_summary.industry_summary}</p>
          </div>
          <h2 className="major"><span>Climate Related Industry Risks, Mitigations & Opportunities</span></h2>
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 justify-content-center">
            {mitigations}
          </div>
        </section>
        <section className="box features pt-10">
          <h2 className="major"><span>Climate Analysis - {city_name.replace('-', ' ')}</span></h2>
        </section>
        
          </div>
      <div className="container m-auto grid grid-cols-1 xl:grid-cols-2 gap-4">
        {line_charts}
        {bar_charts}
      </div>
      <section className="box features pt-10">
        <h2 className="major"><span></span></h2>
      </section>
    </div>
    </div>)
}

function removeNumberDot(str: string){
  return str.replace(/^\w+\./, "");
}