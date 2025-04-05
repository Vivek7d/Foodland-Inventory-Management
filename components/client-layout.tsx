"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";

  return (
    <div className="flex h-screen overflow-hidden">
      {!isRootRoute && <AppSidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!isRootRoute && <Header />}
        <main
          className={`flex-1 overflow-y-auto ${
            !isRootRoute ? "bg-muted/40 p-4" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
