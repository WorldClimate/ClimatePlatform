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
  console.log('Slugs:'+useParams().slug);
  const country_name = useParams().slug[0].toString();
  const city_name = useParams().slug[1].toString();
      return (
      <QueryClientProvider client={queryClient}>
      <section id="main">
        <div className="px-10">
          <Overview country_name={country_name} city_name={city_name}/>
        </div>
      </section>
</QueryClientProvider>
    );
}