<<<<<<< HEAD
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/sidebar-provider";
import { ClientLayout } from "@/components/client-layout";

const inter = Inter({ subsets: ["latin"] });
=======
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })
>>>>>>> 476b3dd8d1de004ae9e2ce54f8c6dc316c1f2aab

export const metadata: Metadata = {
  title: "Foodland Semi-Automation System",
  description: "Automation and transparency system for Foodland operations",
<<<<<<< HEAD
  generator: "v0.dev",
};
=======
    generator: 'v0.dev'
}
>>>>>>> 476b3dd8d1de004ae9e2ce54f8c6dc316c1f2aab

export default function RootLayout({
  children,
}: Readonly<{
<<<<<<< HEAD
  children: React.ReactNode;
=======
  children: React.ReactNode
>>>>>>> 476b3dd8d1de004ae9e2ce54f8c6dc316c1f2aab
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
<<<<<<< HEAD
          <ClientLayout>{children}</ClientLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
=======
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto bg-muted/40 p-4">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'
>>>>>>> 476b3dd8d1de004ae9e2ce54f8c6dc316c1f2aab
