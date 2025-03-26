"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import BackBtn from "@/components/ui/app-backbtn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <QueryClientProvider client={queryClient}>
            
            <SidebarProvider>
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between p-1">
                  {/* Back Button on the left */}
                  <BackBtn />

                  {/* Sidebar Trigger on the right */}
                  <SidebarTrigger />
                </div>
                  <Toaster />
                  <main>{children}</main>
                </div>
              </SidebarInset>
              <AppSidebar side="right" />
            </SidebarProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
