import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/app/providers/auth";
import Header from "@/app/components/ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SFC: Smart Finance Calculator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main className="flex min-h-screen w-full flex-col items-center gap-5 p-5 xl:flex-row xl:items-start xl:justify-center">
            <Header />
            <div className="w-full max-w-2xl">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
