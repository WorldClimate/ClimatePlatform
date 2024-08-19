import { NextRequest, NextResponse } from "next/server"
export async function GET(req: NextRequest) {
return NextResponse.json(
    "OK", { status: 200, statusText: "OK" });
}