import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Filter, MoreVertical, Plus, RefreshCw, Search, Star } from "lucide-react"

const suppliers = [
  {
    id: "SUP-001",
    name: "Fresh Farms Inc.",
    category: "Vegetables",
    contact: "John Smith",
    email: "john@freshfarms.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    status: "Active",
    lastOrder: "2023-03-01",
  },
  {
    id: "SUP-002",
    name: "Organic Meats Co.",
    category: "Meat",
    contact: "Sarah Johnson",
    email: "sarah@organicmeats.com",
    phone: "+1 (555) 234-5678",
    rating: 4.5,
    status: "Active",
    lastOrder: "2023-03-03",
  },
  {
    id: "SUP-003",
    name: "Global Grains Ltd.",
    category: "Grains",
    contact: "Michael Brown",
    email: "michael@globalgrains.com",
    phone: "+1 (555) 345-6789",
    rating: 4.2,
    status: "Active",
    lastOrder: "2023-02-28",
  },
  {
    id: "SUP-004",
    name: "Dairy Delights",
    category: "Dairy",
    contact: "Emily Davis",
    email: "emily@dairydelights.com",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
    status: "Active",
    lastOrder: "2023-03-04",
  },
  {
    id: "SUP-005",
    name: "Seafood Suppliers",
    category: "Seafood",
    contact: "David Wilson",
    email: "david@seafoodsuppliers.com",
    phone: "+1 (555) 567-8901",
    rating: 4.0,
    status: "Inactive",
    lastOrder: "2023-02-15",
  },
  {
    id: "SUP-006",
    name: "Bakery Basics",
    category: "Baking",
    contact: "Jennifer Lee",
    email: "jennifer@bakerybasics.com",
    phone: "+1 (555) 678-9012",
    rating: 4.6,
    status: "Active",
    lastOrder: "2023-03-02",
  },
  {
    id: "SUP-007",
    name: "Spice Traders",
    category: "Spices",
    contact: "Robert Martinez",
    email: "robert@spicetraders.com",
    phone: "+1 (555) 789-0123",
    rating: 4.3,
    status: "Active",
    lastOrder: "2023-02-25",
  },
  {
    id: "SUP-008",
    name: "Fruit Importers",
    category: "Fruits",
    contact: "Lisa Anderson",
    email: "lisa@fruitimporters.com",
    phone: "+1 (555) 890-1234",
    rating: 3.9,
    status: "Active",
    lastOrder: "2023-03-05",
  },
]

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Supplier & Vendor Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>Manage your suppliers, track performance, and maintain relationships.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search suppliers..." className="pl-8" />
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">
                      <div>{supplier.name}</div>
                      <div className="text-xs text-muted-foreground">{supplier.id}</div>
                    </TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>
                      <div>{supplier.contact}</div>
                      <div className="text-xs text-muted-foreground">{supplier.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{supplier.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(supplier.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : i < supplier.rating
                                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                                    : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={supplier.status === "Active" ? "success" : "outline"}>{supplier.status}</Badge>
                    </TableCell>
                    <TableCell>{supplier.lastOrder}</TableCell>
                    <TableCell className="text-right">
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
                          <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                          <DropdownMenuItem>Order History</DropdownMenuItem>
                          <DropdownMenuItem>Performance Metrics</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Deactivate Supplier</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

