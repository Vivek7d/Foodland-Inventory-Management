"use client";

import { useSidebar } from "./sidebar-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  ClipboardList,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Inventory", href: "/inventory", icon: Box },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Request", href: "/payment", icon: Truck },
  { name: "Analytics", href: "/analytic", icon: BarChart3 },
  { name: "Suppliers", href: "/suppliers", icon: Package },
  { name: "Audit & Reports", href: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-card border-r border-border h-screen transition-all duration-300 overflow-y-auto",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 flex items-center justify-center h-16 border-b">
        {isOpen ? (
          <h1 className="font-bold text-xl">Foodland</h1>
        ) : (
          <span className="font-bold text-xl">F</span>
        )}
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Button
                  asChild
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isOpen ? "px-3" : "px-0 justify-center"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5 mr-2" />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
