"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { name: "01", sales: 4000, orders: 24 },
  { name: "02", sales: 3000, orders: 18 },
  { name: "03", sales: 2000, orders: 12 },
  { name: "04", sales: 2780, orders: 19 },
  { name: "05", sales: 1890, orders: 14 },
  { name: "06", sales: 2390, orders: 18 },
  { name: "07", sales: 3490, orders: 22 },
  { name: "08", sales: 2000, orders: 15 },
  { name: "09", sales: 2780, orders: 20 },
  { name: "10", sales: 1890, orders: 14 },
  { name: "11", sales: 2390, orders: 21 },
  { name: "12", sales: 3490, orders: 25 },
  { name: "13", sales: 3000, orders: 19 },
  { name: "14", sales: 2000, orders: 16 },
  { name: "15", sales: 2780, orders: 18 },
  { name: "16", sales: 1890, orders: 15 },
  { name: "17", sales: 2390, orders: 17 },
  { name: "18", sales: 3490, orders: 23 },
  { name: "19", sales: 2000, orders: 14 },
  { name: "20", sales: 2780, orders: 19 },
  { name: "21", sales: 1890, orders: 13 },
  { name: "22", sales: 2390, orders: 15 },
  { name: "23", sales: 3490, orders: 24 },
  { name: "24", sales: 2780, orders: 20 },
  { name: "25", sales: 1890, orders: 15 },
  { name: "26", sales: 2390, orders: 18 },
  { name: "27", sales: 3490, orders: 22 },
  { name: "28", sales: 2000, orders: 16 },
  { name: "29", sales: 2780, orders: 19 },
  { name: "30", sales: 1890, orders: 14 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#8884d8" fillOpacity={1} fill="url(#colorSales)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

