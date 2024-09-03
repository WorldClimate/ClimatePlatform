"use client";

import React from 'react';
import { useParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Overview from '@/components/Location/Overview';

const queryClient = new QueryClient()

export default function LocationPage() {
  const location = useParams().slug.toString()
      return (
      <QueryClientProvider client={queryClient}>
      <section id="main">
        <div className="px-10">
          <Overview location={location}/>
        </div>
      </section>
</QueryClientProvider>
    );
}