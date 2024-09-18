import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
import { GetObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
  
  console.log(req.nextUrl.searchParams.get("city_name"))
  const city_name = req.nextUrl.searchParams.get("city_name")?.toLowerCase()
  const country_name = req.nextUrl.searchParams.get("country_name")?.toLowerCase()
  const field = req.nextUrl.searchParams.get("field")
  const client = new S3Client();
  var s3Path;
  if(field==='overview'){
    s3Path = `climate_data/${country_name}/${city_name}/${field}.json`;
  }
  else if (field?.includes('genai_analysis')){
    s3Path = `climate_data/${country_name}/${city_name}/${field}.json`;
  }
  else{ 
    s3Path = `climate_data/${country_name}/${city_name}/combined_${field}.json`;
  }
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: s3Path,
  });
  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    if (!response.Body) {
      throw new Error("Response body is undefined");
    }
    const str = await response.Body.transformToString();
    const jsonresponse = JSON.parse(str);
    return NextResponse.json(jsonresponse, { status: 200, statusText: "OK" });
  } catch (err) {
    console.error(err);
  }



  
}

