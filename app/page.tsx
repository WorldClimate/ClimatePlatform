"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Map from "@/components/Map";
import Link from "next/link";

export default function Page() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <header id="header">
        <div className="logo container">
          <div>
            <h1 className="text-lg">
                The World Climate
            </h1>
          </div>
        </div>
      </header>
      <Map />
      <div className="flex flex-col md:flex-row gap-16 items-center w-10/12 mx-auto bg-[url('/images/overlay.png')">
        <div className="w-full">
          <h2 className="uppercase font-semibold text-4xl mb-3 md:mb-5">
            Welcome to the World Climate.com
          </h2>
          <p className="flex gap-5">
            <i className="mt-5 text-primary fa-solid fa-earth-americas fa-xl md:fa-2xl"></i>
            <span className="text-muted-foreground">
              A SITE WHERE WE&apos;RE LOOKING TO IMPROVE OUR WORLDS OUTLOOK BY
              PROVIDING RESOURCES AND TOOLING FOR EVERYONE TO EXAMINE THE FUTURE
              OF CLIMATE IN THEIR OWN BACKYARD
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
