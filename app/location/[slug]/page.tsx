"use client";

import React from 'react';
import { useParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import WCLineChart from '@/components/Location/WCLineChart';
import WCBarChart from '@/components/Location/WCBarChart';
import Overview from '@/components/Location/Overview';
import ChartAnalysis from '@/components/Location/ChartAnalysis';

const queryClient = new QueryClient()

export default function LocationPage() {
  const location = useParams().slug.toString()
      return (
      <QueryClientProvider client={queryClient}>
      <section id="main">
        <div className="container mx-auto px-10">
          <Overview location={location}/>
        </div>
      </section>
</QueryClientProvider>
    );
}