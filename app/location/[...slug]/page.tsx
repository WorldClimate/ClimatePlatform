"use client";

import React from 'react';
import { useParams } from 'next/navigation'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Overview from '@/components/Location/Overview';
import { notFound } from 'next/navigation'
const queryClient = new QueryClient()

export default function LocationPage() {
  const params = useParams().slug;
  if(params.length < 2){ return notFound()}

  const country_name = params[0].toString();
  const city_name = params[1].toString();
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