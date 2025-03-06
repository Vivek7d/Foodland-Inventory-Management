"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
} from "recharts";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  Calendar,
  Filter,
  TrendingUp,
  Package,
  ShoppingCart,
} from "lucide-react";

// Define types for historical data with multi-year sales
interface SalesItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  // Restructured to include yearly data
  salesData: {
    [year: string]: {
      [month: string]: number;
    };
  };
  price: number;
  threshold: number;
}

// Define type for forecast adjustments
interface ForecastAdjustments {
  [key: number]: number;
}

// Sample historical sales data from 2021-2024
const historicalData: SalesItem[] = [
  {
    id: 1,
    name: "Apples",
    category: "Fruits",
    stock: 150,
    salesData: {
      "2021": {
        Jan: 38,
        Feb: 42,
        Mar: 45,
        Apr: 40,
        May: 38,
        Jun: 42,
        Jul: 48,
        Aug: 52,
        Sep: 55,
        Oct: 48,
        Nov: 45,
        Dec: 50,
      },
      "2022": {
        Jan: 40,
        Feb: 45,
        Mar: 48,
        Apr: 42,
        May: 40,
        Jun: 45,
        Jul: 50,
        Aug: 55,
        Sep: 58,
        Oct: 52,
        Nov: 48,
        Dec: 53,
      },
      "2023": {
        Jan: 42,
        Feb: 47,
        Mar: 50,
        Apr: 45,
        May: 43,
        Jun: 48,
        Jul: 53,
        Aug: 58,
        Sep: 60,
        Oct: 55,
        Nov: 52,
        Dec: 57,
      },
      "2024": {
        Jan: 45,
        Feb: 50,
        Mar: 53,
        Apr: 48,
        May: 46,
        Jun: 51,
        Jul: 56,
        Aug: 60,
        Sep: 63,
        Oct: 58,
        Nov: 55,
        Dec: 60,
      },
    },
    price: 1.99,
    threshold: 30,
  },
  {
    id: 2,
    name: "Bananas",
    category: "Fruits",
    stock: 200,
    salesData: {
      "2021": {
        Jan: 82,
        Feb: 85,
        Mar: 88,
        Apr: 90,
        May: 92,
        Jun: 95,
        Jul: 98,
        Aug: 100,
        Sep: 95,
        Oct: 92,
        Nov: 88,
        Dec: 85,
      },
      "2022": {
        Jan: 85,
        Feb: 88,
        Mar: 92,
        Apr: 95,
        May: 98,
        Jun: 100,
        Jul: 103,
        Aug: 105,
        Sep: 100,
        Oct: 97,
        Nov: 93,
        Dec: 90,
      },
      "2023": {
        Jan: 90,
        Feb: 93,
        Mar: 97,
        Apr: 100,
        May: 103,
        Jun: 105,
        Jul: 108,
        Aug: 110,
        Sep: 105,
        Oct: 102,
        Nov: 98,
        Dec: 95,
      },
      "2024": {
        Jan: 95,
        Feb: 98,
        Mar: 102,
        Apr: 105,
        May: 108,
        Jun: 110,
        Jul: 113,
        Aug: 115,
        Sep: 110,
        Oct: 107,
        Nov: 103,
        Dec: 100,
      },
    },
    price: 0.99,
    threshold: 50,
  },
  {
    id: 3,
    name: "Milk",
    category: "Dairy",
    stock: 75,
    salesData: {
      "2021": {
        Jan: 28,
        Feb: 30,
        Mar: 32,
        Apr: 30,
        May: 28,
        Jun: 30,
        Jul: 32,
        Aug: 34,
        Sep: 33,
        Oct: 31,
        Nov: 29,
        Dec: 33,
      },
      "2022": {
        Jan: 30,
        Feb: 32,
        Mar: 34,
        Apr: 32,
        May: 30,
        Jun: 32,
        Jul: 34,
        Aug: 36,
        Sep: 35,
        Oct: 33,
        Nov: 31,
        Dec: 35,
      },
      "2023": {
        Jan: 32,
        Feb: 34,
        Mar: 36,
        Apr: 34,
        May: 32,
        Jun: 34,
        Jul: 36,
        Aug: 38,
        Sep: 37,
        Oct: 35,
        Nov: 33,
        Dec: 37,
      },
      "2024": {
        Jan: 34,
        Feb: 36,
        Mar: 38,
        Apr: 36,
        May: 34,
        Jun: 36,
        Jul: 38,
        Aug: 40,
        Sep: 39,
        Oct: 37,
        Nov: 35,
        Dec: 39,
      },
    },
    price: 3.49,
    threshold: 20,
  },
  {
    id: 4,
    name: "Bread",
    category: "Bakery",
    stock: 60,
    salesData: {
      "2021": {
        Jan: 25,
        Feb: 24,
        Mar: 26,
        Apr: 28,
        May: 30,
        Jun: 29,
        Jul: 27,
        Aug: 26,
        Sep: 28,
        Oct: 30,
        Nov: 32,
        Dec: 35,
      },
      "2022": {
        Jan: 27,
        Feb: 26,
        Mar: 28,
        Apr: 30,
        May: 32,
        Jun: 31,
        Jul: 29,
        Aug: 28,
        Sep: 30,
        Oct: 32,
        Nov: 34,
        Dec: 37,
      },
      "2023": {
        Jan: 29,
        Feb: 28,
        Mar: 30,
        Apr: 32,
        May: 34,
        Jun: 33,
        Jul: 31,
        Aug: 30,
        Sep: 32,
        Oct: 34,
        Nov: 36,
        Dec: 39,
      },
      "2024": {
        Jan: 31,
        Feb: 30,
        Mar: 32,
        Apr: 34,
        May: 36,
        Jun: 35,
        Jul: 33,
        Aug: 32,
        Sep: 34,
        Oct: 36,
        Nov: 38,
        Dec: 41,
      },
    },
    price: 2.49,
    threshold: 15,
  },
  {
    id: 5,
    name: "Chicken",
    category: "Meat",
    stock: 45,
    salesData: {
      "2021": {
        Jan: 15,
        Feb: 14,
        Mar: 16,
        Apr: 18,
        May: 20,
        Jun: 22,
        Jul: 24,
        Aug: 22,
        Sep: 20,
        Oct: 18,
        Nov: 16,
        Dec: 18,
      },
      "2022": {
        Jan: 16,
        Feb: 15,
        Mar: 17,
        Apr: 19,
        May: 21,
        Jun: 23,
        Jul: 25,
        Aug: 23,
        Sep: 21,
        Oct: 19,
        Nov: 17,
        Dec: 19,
      },
      "2023": {
        Jan: 17,
        Feb: 16,
        Mar: 18,
        Apr: 20,
        May: 22,
        Jun: 24,
        Jul: 26,
        Aug: 24,
        Sep: 22,
        Oct: 20,
        Nov: 18,
        Dec: 20,
      },
      "2024": {
        Jan: 18,
        Feb: 17,
        Mar: 19,
        Apr: 21,
        May: 23,
        Jun: 25,
        Jul: 27,
        Aug: 25,
        Sep: 23,
        Oct: 21,
        Nov: 19,
        Dec: 21,
      },
    },
    price: 7.99,
    threshold: 10,
  },
];

// Categories for filtering
const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Meat",
  "Grains",
];

// Time periods
const timePeriods = ["Monthly", "Quarterly", "Yearly"];

// Years available
const years = ["2021", "2022", "2023", "2024", "2025 (Forecast)"];

// Months for labeling
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Advanced forecasting function using trend-based prediction
const forecastDemand = (
  item: SalesItem,
  targetYear: string = "2025",
  targetMonth?: string
): number => {
  // If a specific month is requested
  if (targetMonth) {
    // Calculate the year-over-year growth for this month
    const yearlyRates: number[] = [];

    // Get growth rates between consecutive years
    for (let i = 2022; i <= 2024; i++) {
      const prevYearSales = item.salesData[`${i - 1}`][targetMonth];
      const currYearSales = item.salesData[`${i}`][targetMonth];
      const growthRate = (currYearSales - prevYearSales) / prevYearSales;
      yearlyRates.push(growthRate);
    }

    // Average growth rate
    const avgGrowthRate =
      yearlyRates.reduce((a, b) => a + b, 0) / yearlyRates.length;

    // Apply growth rate to last year's data
    const lastYearValue = item.salesData["2024"][targetMonth];
    const prediction = Math.round(lastYearValue * (1 + avgGrowthRate));

    // Add some randomness (±5%)
    const randomFactor = 1 + (Math.random() * 0.1 - 0.05);
    return Math.max(1, Math.round(prediction * randomFactor));
  }

  // If annual forecast is requested, sum up monthly forecasts
  let annualForecast = 0;
  months.forEach((month) => {
    annualForecast += forecastDemand(item, targetYear, month);
  });

  return annualForecast;
};

// COLORS
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
];

function AnalyticsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Monthly");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showForecast, setShowForecast] = useState(true);
  const [filteredData, setFilteredData] = useState<SalesItem[]>(historicalData);
  const [adjustedForecasts, setAdjustedForecasts] =
    useState<ForecastAdjustments>({});

  // Update filtered data when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(historicalData);
    } else {
      setFilteredData(
        historicalData.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  // Generate forecasts for each item in a specific month
  const getForecast = (item: SalesItem, month?: string): number => {
    if (adjustedForecasts[item.id]) {
      return adjustedForecasts[item.id];
    }
    return forecastDemand(item, "2025", month);
  };

  // Check for items that need restocking based on forecast
  const itemsToRestock = filteredData.filter((item) => {
    const annualForecast = forecastDemand(item);
    const monthlyAverage = Math.round(annualForecast / 12);
    return item.stock <= item.threshold || item.stock <= monthlyAverage * 2; // 2 months supply
  });

  // Prepare data for historical and forecast charts
  const prepareTimeSeriesData = () => {
    // Create data points for each month
    const data: { date: string; [key: string]: string | number }[] = [];

    // Get data for each year
    const yearsToInclude = showForecast
      ? ["2021", "2022", "2023", "2024", "2025"]
      : ["2021", "2022", "2023", "2024"];

    yearsToInclude.forEach((year) => {
      months.forEach((month) => {
        const dataPoint: { date: string; [key: string]: string | number } = {
          date: `${month} ${year}`,
        };

        filteredData.forEach((item) => {
          if (year === "2025") {
            // Use forecast for 2025
            dataPoint[item.name] = getForecast(item, month);
          } else {
            // Use historical data for 2021-2024
            dataPoint[item.name] = item.salesData[year][month];
          }
        });

        data.push(dataPoint);
      });
    });

    return data;
  };

  // Prepare annual comparison data
  const prepareAnnualData = () => {
    const data: { year: string; [key: string]: string | number }[] = [];

    const yearsToInclude = showForecast
      ? ["2021", "2022", "2023", "2024", "2025"]
      : ["2021", "2022", "2023", "2024"];

    yearsToInclude.forEach((year) => {
      const dataPoint: { year: string; [key: string]: string | number } = {
        year,
      };

      filteredData.forEach((item) => {
        if (year === "2025") {
          // Use annual forecast for 2025
          dataPoint[item.name] = forecastDemand(item);
        } else {
          // Sum monthly data for historical years
          const annualSum = Object.values(item.salesData[year]).reduce(
            (sum, value) => sum + value,
            0
          );
          dataPoint[item.name] = annualSum;
        }
      });

      data.push(dataPoint);
    });

    return data;
  };

  // Prepare inventory forecast data
  const prepareInventoryForecastData = () => {
    return filteredData.map((item) => {
      const annualForecast = forecastDemand(item);
      const monthlyAverage = Math.round(annualForecast / 12);

      return {
        name: item.name,
        current: item.stock,
        forecast: monthlyAverage,
        threshold: item.threshold,
        monthsSupply: Math.round((item.stock / monthlyAverage) * 10) / 10, // To 1 decimal place
      };
    });
  };

  // Handle forecast adjustments
  const handleForecastAdjustment = (
    itemId: number,
    adjustment: number
  ): void => {
    const item = historicalData.find((i) => i.id === itemId);
    if (!item) return; // Handle case where item is not found

    // Get the current annual forecast or the calculated one
    const currentAnnualForecast =
      adjustedForecasts[itemId] || forecastDemand(item);
    const monthlyAdjustment = adjustment * 10; // Scale adjustment for annual impact

    setAdjustedForecasts({
      ...adjustedForecasts,
      [itemId]: Math.max(1, currentAnnualForecast + monthlyAdjustment),
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Demand Forecasting Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Filter className="inline w-4 h-4 mr-1" /> Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline w-4 h-4 mr-1" /> Time Period
          </label>
          <select
            value={selectedTimePeriod}
            onChange={(e) => setSelectedTimePeriod(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {timePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Include 2025 Forecast
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showForecast}
                onChange={() => setShowForecast(!showForecast)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Show Predictions</span>
            </label>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-blue-500" />
            Total Items
          </h3>
          <p className="text-3xl font-bold">{filteredData.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Package className="w-5 h-5 mr-2 text-green-500" />
            Total Inventory
          </h3>
          <p className="text-3xl font-bold">
            {filteredData.reduce((total, item) => total + item.stock, 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            Items to Restock
          </h3>
          <p className="text-3xl font-bold">{itemsToRestock.length}</p>
        </div>
      </div>

      {/* Alerts Section */}
      {itemsToRestock.length > 0 && (
        <div className="mb-8 bg-red-50 p-4 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold mb-4 text-red-700 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Restock Alerts Based on 2025 Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemsToRestock.map((item) => {
              const annualForecast = forecastDemand(item);
              const monthlyAverage = Math.round(annualForecast / 12);

              return (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded shadow-sm border border-red-100 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Current: {item.stock} | Threshold: {item.threshold}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-red-600 font-bold block">
                      Monthly Avg: {monthlyAverage}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {Math.round((item.stock / monthlyAverage) * 10) / 10}{" "}
                      months supply
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Multi-Year Trend Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {showForecast
            ? "2021-2025 Sales Trends (Including Forecast)"
            : "2021-2024 Historical Sales Trends"}
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={prepareAnnualData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {filteredData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Line
                    type="monotone"
                    dataKey={item.name}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  {showForecast && (
                    <Area
                      type="monotone"
                      dataKey={item.name}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                      opacity={0.1}
                    />
                  )}
                </React.Fragment>
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales Patterns</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prepareTimeSeriesData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                interval={showForecast ? 2 : 1}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {filteredData.map((item, index) => (
                <Line
                  key={item.id}
                  type="monotone"
                  dataKey={item.name}
                  stroke={COLORS[index % COLORS.length]}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={1.5}
                  // Use dashed line for forecasted data
                  strokeDasharray={showForecast ? "5 5" : "0"}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Forecast */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Current Stock vs 2025 Forecast
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={prepareInventoryForecastData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#8884d8" name="Current Stock" />
              <Bar
                dataKey="forecast"
                fill="#82ca9d"
                name="Monthly Demand (2025)"
              />
              <Bar
                dataKey="threshold"
                fill="#ff8042"
                name="Minimum Threshold"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecasting Adjustments */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          2025 Forecast Adjustments
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Forecast (2025)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Average
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adjust
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => {
                const annualForecast =
                  adjustedForecasts[item.id] || forecastDemand(item);
                const monthlyAverage = Math.round(annualForecast / 12);

                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {annualForecast}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {monthlyAverage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                          onClick={() => handleForecastAdjustment(item.id, -1)}
                        >
                          <ArrowDownCircle className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1 rounded-full hover:bg-gray-100 text-green-500"
                          onClick={() => handleForecastAdjustment(item.id, 1)}
                        >
                          <ArrowUpCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
