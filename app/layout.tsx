import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
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
        className={`${montserrat.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}