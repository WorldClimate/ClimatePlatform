"use client";
import { NextRequest, NextResponse } from "next/server"
import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ReportOverview from '@/components/Reports/ReportOverview';
import { Suspense } from 'react'

const queryClient = new QueryClient()

export default function ReportPage(req: NextRequest) {
      return (
        <Suspense fallback={<img src="/images/loading-spinner.svg" className="m-auto"/>}>
          <QueryClientProvider client={queryClient}>
            <section id="main">
              <div className="px-10">
                <ReportOverview/>
              </div>
            </section>
          </QueryClientProvider>
        </Suspense>
    );
}