import { siteConfig } from "@/config/site";
import "@/styles/_keyframe-animations.scss";
import "@/styles/_variables.scss";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "highlight.js/styles/vs2015.css";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} : Powered by News Flow`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@rathonagency",
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
