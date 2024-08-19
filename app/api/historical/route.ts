import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
import * as fs from 'fs';
import * as path from 'path';

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get("location"))
  const location = req.nextUrl.searchParams.get("location")
  const field = req.nextUrl.searchParams.get("field")
  var JSONFilePath;
  if(field==='overview'){
    JSONFilePath = path.resolve('data/'+location+'/'+field+'.json');
  }
  else { 
    JSONFilePath = path.resolve('data/'+location+'/combined_'+field+'.json');
  }
  const fileContent = fs.readFileSync(JSONFilePath, { encoding: 'utf-8' });
  const jsonresponse = JSON.parse(fileContent);

return NextResponse.json(jsonresponse, { status: 200, statusText: "OK" });

  
}

