"use client";
import { NextRequest, NextResponse } from "next/server"
import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import ReportOverview from '@/components/Reports/ReportOverview';
import ReportDataEntry from '@/components/Reports/ReportDataEntry';
import { Suspense } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

export default function ReportPage(req: NextRequest) {
      const [reportState, setReportState] = useState({city_name: "", company_name: "", country_name: "", industry: "", mock_data: false, inputComplete: false});
      return (
        <Suspense fallback={<img src="/images/loading-spinner.svg" className="m-auto"/>}>
          <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
  >
            <section id="main">
              <div className="px-10">
                {reportState.inputComplete ? <ReportOverview city_name={reportState.city_name} company_name={reportState.company_name} 
                                country_name={reportState.country_name} industry={reportState.industry} mock_data={reportState.mock_data}/> 
                                : <ReportDataEntry setReportState={setReportState}/>}
              </div>
            </section>
          </PersistQueryClientProvider>
        </Suspense>
    );
}