import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get("location"))
  const location = req.nextUrl.searchParams.get("location")
  const field = req.nextUrl.searchParams.get("field")
  var csvFilePath;
  if(field==='overview'){
    csvFilePath = path.resolve('data/'+location+'/'+field+'.json');
  }
  else { 
    csvFilePath = path.resolve('data/'+location+'/combined_'+field+'.json');
  }
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  const jsonresponse = JSON.parse(fileContent);
// or just use new Response ❗️
return NextResponse.json(jsonresponse, { status: 200, statusText: "OK" });

  
}

