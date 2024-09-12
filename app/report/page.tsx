"use client";
import { NextRequest, NextResponse } from "next/server"
import React from 'react';
import { useSearchParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SpinningCircles } from 'react-loading-icons'
import ReportOverview from '@/components/Reports/ReportOverview';
import { count } from "console";

const queryClient = new QueryClient()

export default function ReportPage(req: NextRequest) {
  const searchParams = useSearchParams()
  const city_name = searchParams.get("city_name") || "New York"
  const country_name = searchParams.get("country_name") || "united states"
  const industry = searchParams.get("industry") || "finance"
  const company_name = searchParams.get("company_name") || "Test Company"

      return (
      <QueryClientProvider client={queryClient}>
        <section id="main">
          <div className="px-10">
            <ReportOverview city_name={city_name} country_name = {country_name} industry={industry} company_name={company_name}/>
          </div>
        </section>
      </QueryClientProvider>
    );
}