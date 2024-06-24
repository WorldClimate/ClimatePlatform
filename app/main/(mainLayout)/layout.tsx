import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });
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
      <body className={poppins.className}>
        <MobileNav/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
