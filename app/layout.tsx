import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NS Financial",
  description: "Simplify Your Finances. Focus on Your Business.",
  openGraph: {
    title: "NS Financial",
    description: "Simplify Your Finances. Focus on Your Business.",
    url: "https://www.nsfinancialservice.com/",
    siteName: "NS Financial",
    images: [
      {
        url: "/logo_with_gradient.png",
        width: 1200,
        height: 630,
        alt: "NS Financial Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NS Financial",
    description: "Simplify Your Finances. Focus on Your Business.",
    images: ["/logo_with_gradient.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
