import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StatusBar } from "../components/dashboard/stutus-bar-props";
import { QueryProvider } from "../components/providers";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTCO Virtopay",
  description: "A featured for GTCO Virtopay card management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-[#1A1A1A] antialiased mx-auto w-[393px] h-screen overflow-hidden overflow-y-scroll`}
      >
        <QueryProvider>
          <div className="flex  flex-col bg-[#1A1A1A]">
            <StatusBar />
            {children}
          </div>
          <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
