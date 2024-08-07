import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

type HistoricalData = {
  name: string;
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string;
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  sealevelpressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunset: string;
  moonphase: string;
  conditions: string;
  description: string;
  icon: string;
  stations: string;
}

type HistoricalTempMax = {
  datetime: string;
  tempmax: number;
}

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get("location"))
  const location = req.nextUrl.searchParams.get("location")
  const field = req.nextUrl.searchParams.get("field")
  const csvFilePath = path.resolve('data/'+location+'/combined_'+field+'.json');
  
  const headers = [
    'datetime',
    'tempmax',
  ];
  
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  const jsonresponse = JSON.parse(fileContent);
// or just use new Response ❗️
return NextResponse.json(jsonresponse, { status: 200, statusText: "OK" });

  
}

