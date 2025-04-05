'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Monthly sales data for the year 2024
const monthlySalesData = [
  { name: 'Jan', sales: 45000 },
  { name: 'Feb', sales: 52000 },
  { name: 'Mar', sales: 48000 },
  { name: 'Apr', sales: 61000 },
  { name: 'May', sales: 55000 },
  { name: 'Jun', sales: 67000 },
  { name: 'Jul', sales: 72000 },
  { name: 'Aug', sales: 68000 },
  { name: 'Sep', sales: 59000 },
  { name: 'Oct', sales: 63000 },
  { name: 'Nov', sales: 58000 },
  { name: 'Dec', sales: 71000 }
];

export function SalesOverview() {
  // Format currency in Indian Rupees
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Monthly sales performance from January to December 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlySalesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="sales" fill="#6366F1" name="Monthly Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 