
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "./main.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";

import Footer from "@/components/Footer";
import Script from "next/script";
import { GoogleAnalyticsTracking } from "@/components/GoogleAnalyticsTracking";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "The World Climate",
  description:
    "Improving our worlds outlook by providing resources and tooling for everyone to examine the future of climate in their own backyard.",
  openGraph: {
    title: "The World Climate",
    description:
      "Improving our worlds outlook by providing resources and tooling for everyone to examine the future of climate in their own backyard.",
    url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    siteName: "The World Climate",
    images: [
      {
        url: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        width: 1920,
        height: 1080,
        alt: "The World Climate",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "The World Climate",
    description:
      "Improving our worlds outlook by providing resources and tooling for everyone to examine the future of climate in their own backyard.",
    card: "summary_large_image",
    images: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <Script src="https://kit.fontawesome.com/4c9efe62f8.js"/>
        <GoogleAnalyticsTracking/>
        </head>
          <body className={poppins.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar/>
              {children}
              <Footer/>
            </ThemeProvider>
          </body>
    </html>
  );
}
