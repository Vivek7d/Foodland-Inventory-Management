import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Box,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { DashboardChart } from "@/components/dashboard-chart";
import { RecentOrders } from "@/components/recent-orders";
import { InventoryStatus } from "@/components/inventory-status";
import { SalesOverview } from "@/components/sales-overview";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Refresh Data</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Alert
            variant="destructive"
            className="border-destructive/50 text-destructive"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Stock Alert</AlertTitle>
            <AlertDescription>
              8 items are below minimum stock levels.{" "}
              <Button variant="link" className="p-0 h-auto">
                View details
              </Button>
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <span className="text-lg font-bold text-muted-foreground">
                  ₹
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹3,45,231.89</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  +20.1% from last month
                  <ArrowUpRight className="ml-1 h-3 w-3 text-emerald-500" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  +8.2% from yesterday
                  <ArrowUpRight className="ml-1 h-3 w-3 text-emerald-500" />
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inventory Items
                </CardTitle>
                <Box className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">
                    1,197 In Stock
                  </Badge>
                  <Badge variant="destructive" className="text-xs">
                    48 Low Stock
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Deliveries
                </CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9</div>
                <div className="flex items-center gap-1">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-xs">
                    4 In Transit
                  </Badge>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-xs">
                    5 Out for Delivery
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <SalesOverview />
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders received</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryStatus />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-8 border-primary/20 border-t-primary relative flex items-center justify-center">
                      <span className="text-2xl font-bold">78%</span>
                    </div>
                    <span className="mt-2 text-sm text-center">
                      Target Achievement
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Revenue</span>
                        <span className="text-sm font-medium">₹3.45L</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[75%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Orders</span>
                        <span className="text-sm font-medium">142</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[65%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Growth</span>
                        <span className="text-sm font-medium">+12.5%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[82%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] relative">
                      <div className="absolute inset-0 flex items-end justify-around pb-10">
                        <div
                          className="w-1/4 bg-primary/80 rounded-t-md"
                          style={{ height: "60%" }}
                        ></div>
                        <div
                          className="w-1/4 bg-primary/60 rounded-t-md"
                          style={{ height: "85%" }}
                        ></div>
                        <div
                          className="w-1/4 bg-primary/40 rounded-t-md"
                          style={{ height: "40%" }}
                        ></div>
                        <div
                          className="w-1/4 bg-primary/20 rounded-t-md"
                          style={{ height: "30%" }}
                        ></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-muted-foreground">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Online Sales
                        </span>
                        <span className="font-medium">₹1,45,862</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Store Sales
                        </span>
                        <span className="font-medium">₹1,99,370</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Growth Rate
                        </span>
                        <span className="font-medium">+18.2%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Profit Margin
                        </span>
                        <span className="font-medium">24.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">
                      Category Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px] flex items-center justify-center">
                      <div className="w-44 h-44 rounded-full border-8 border-primary/10 relative flex items-center justify-center">
                        <div
                          className="absolute w-full h-full rounded-full border-[16px] border-transparent border-t-primary/80 border-r-primary/40 border-b-primary/20"
                          style={{ transform: "rotate(-45deg)" }}
                        ></div>
                        <div className="z-10 flex flex-col items-center">
                          <span className="text-2xl font-bold">86%</span>
                          <span className="text-xs text-muted-foreground">
                            Active Items
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary/80 rounded-full"></div>
                        <span className="text-sm">Produce</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary/40 rounded-full"></div>
                        <span className="text-sm">Dairy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary/20 rounded-full"></div>
                        <span className="text-sm">Meat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary/10 rounded-full"></div>
                        <span className="text-sm">Other</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full relative">
                      <DashboardChart />
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm text-muted-foreground">
                          Orders
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">+12%</span>
                          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm text-muted-foreground">
                          Revenue
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">+8%</span>
                          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm text-muted-foreground">
                          Customers
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">+15%</span>
                          <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-muted/50 rounded">
                        <span className="text-sm text-muted-foreground">
                          Avg Order
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-bold">₹1,245</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
