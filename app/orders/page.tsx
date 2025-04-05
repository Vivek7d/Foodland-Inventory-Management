import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const orders = [
  {
    id: "ORD-1234",
    customer: "Restaurant ABC",
    date: "2023-03-05",
    amount: "$1,245.89",
    status: "Processing",
    items: 12,
    delivery: "2023-03-07",
  },
  {
    id: "ORD-1233",
    customer: "Cafe XYZ",
    date: "2023-03-05",
    amount: "$845.50",
    status: "Shipped",
    items: 8,
    delivery: "2023-03-06",
  },
  {
    id: "ORD-1232",
    customer: "Hotel Grand",
    date: "2023-03-04",
    amount: "$2,450.00",
    status: "Delivered",
    items: 24,
    delivery: "2023-03-05",
  },
  {
    id: "ORD-1231",
    customer: "Restaurant DEF",
    date: "2023-03-04",
    amount: "$950.25",
    status: "Processing",
    items: 10,
    delivery: "2023-03-06",
  },
  {
    id: "ORD-1230",
    customer: "Bakery 123",
    date: "2023-03-03",
    amount: "$345.75",
    status: "Delivered",
    items: 5,
    delivery: "2023-03-04",
  },
  {
    id: "ORD-1229",
    customer: "Cafe 456",
    date: "2023-03-03",
    amount: "$560.00",
    status: "Shipped",
    items: 7,
    delivery: "2023-03-05",
  },
  {
    id: "ORD-1228",
    customer: "Restaurant GHI",
    date: "2023-03-02",
    amount: "$1,120.50",
    status: "Delivered",
    items: 15,
    delivery: "2023-03-03",
  },
  {
    id: "ORD-1227",
    customer: "Hotel Luxury",
    date: "2023-03-02",
    amount: "$3,245.75",
    status: "Delivered",
    items: 30,
    delivery: "2023-03-03",
  },
  {
    id: "ORD-1226",
    customer: "Cafe Morning",
    date: "2023-03-01",
    amount: "$450.25",
    status: "Delivered",
    items: 6,
    delivery: "2023-03-02",
  },
  {
    id: "ORD-1225",
    customer: "Restaurant JKL",
    date: "2023-03-01",
    amount: "$890.00",
    status: "Delivered",
    items: 9,
    delivery: "2023-03-02",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Processing</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        {/* All Orders Tab */}
        <TabsContent value="all" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                View and manage all customer orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and filter controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-8" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Orders table */}
              <OrdersTable orders={orders} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processing Orders Tab */}
        <TabsContent value="processing" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>
                Orders that are currently being processed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and filter controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search processing orders..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Processing orders table */}
              <OrdersTable
                orders={orders.filter((order) => order.status === "Processing")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipped Orders Tab */}
        <TabsContent value="shipped" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
              <CardDescription>
                Orders that have been shipped but not yet delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and filter controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shipped orders..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Shipped orders table */}
              <OrdersTable
                orders={orders.filter((order) => order.status === "Shipped")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivered Orders Tab */}
        <TabsContent value="delivered" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>
                Orders that have been successfully delivered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and filter controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search delivered orders..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Delivered orders table */}
              <OrdersTable
                orders={orders.filter((order) => order.status === "Delivered")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Orders table component - moved to a separate component for reuse across tabs
function OrdersTable({ orders }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "success"
                        : order.status === "Shipped"
                        ? "default"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.delivery}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Order</DropdownMenuItem>
                        <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Track Delivery</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
