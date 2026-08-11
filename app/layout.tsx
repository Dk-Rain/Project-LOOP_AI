import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LOOP — Customer Intelligence Platform",
  description: "Collect customer feedback, analyze sentiment, and make data-driven decisions with LOOP.",
  keywords: "feedback, customer feedback, sentiment analysis, reports, customer intelligence, dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased bg-white text-zinc-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
