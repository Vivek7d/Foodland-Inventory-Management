"use client";

import { useState } from "react";
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
  Filter,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Package,
  AlertTriangle,
  Clock,
  IndianRupee,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  InventoryItemForm,
  InventoryItemFormValues,
} from "./components/inventory-form";

const initialInventoryItems = [
  {
    id: "INV-001",
    name: "Tomatoes",
    category: "Vegetables",
    stock: 5,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-03-05",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Fresh Farms Inc.",
    cost: 2.5,
  },
  {
    id: "INV-002",
    name: "Potatoes",
    category: "Vegetables",
    stock: 8,
    minStock: 15,
    maxStock: 150,
    unit: "kg",
    lastUpdated: "2023-03-04",
    status: "Low Stock",
    expirationDate: "2023-04-20",
    supplier: "Valley Produce",
    cost: 1.2,
  },
  {
    id: "INV-003",
    name: "Onions",
    category: "Vegetables",
    stock: 12,
    minStock: 20,
    maxStock: 200,
    unit: "kg",
    lastUpdated: "2023-03-03",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Fresh Farms Inc.",
    cost: 1.0,
  },
  {
    id: "INV-004",
    name: "Lettuce",
    category: "Vegetables",
    stock: 7,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-03-05",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Fresh Farms Inc.",
    cost: 2.0,
  },
  {
    id: "INV-005",
    name: "Carrots",
    category: "Vegetables",
    stock: 9,
    minStock: 15,
    maxStock: 150,
    unit: "kg",
    lastUpdated: "2023-03-04",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Fresh Farms Inc.",
    cost: 1.5,
  },
  {
    id: "INV-006",
    name: "Rice",
    category: "Grains",
    stock: 50,
    minStock: 20,
    maxStock: 200,
    unit: "kg",
    lastUpdated: "2023-03-02",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Global Grains",
    cost: 2.0,
  },
  {
    id: "INV-007",
    name: "Flour",
    category: "Baking",
    stock: 30,
    minStock: 15,
    maxStock: 150,
    unit: "kg",
    lastUpdated: "2023-03-01",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Baking Supplies",
    cost: 1.0,
  },
  {
    id: "INV-008",
    name: "Sugar",
    category: "Baking",
    stock: 25,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-02-28",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Global Sugar Traders",
    cost: 0.8,
  },
  {
    id: "INV-009",
    name: "Chicken",
    category: "Meat",
    stock: 15,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-03-05",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Poultry",
    cost: 5.0,
  },
  {
    id: "INV-010",
    name: "Beef",
    category: "Meat",
    stock: 20,
    minStock: 15,
    maxStock: 150,
    unit: "kg",
    lastUpdated: "2023-03-04",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Butcher",
    cost: 6.0,
  },
  {
    id: "INV-011",
    name: "Pasta",
    category: "Grains",
    stock: 35,
    minStock: 15,
    maxStock: 150,
    unit: "kg",
    lastUpdated: "2023-03-02",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Global Pasta Supplies",
    cost: 1.2,
  },
  {
    id: "INV-012",
    name: "Eggs",
    category: "Dairy",
    stock: 120,
    minStock: 50,
    maxStock: 500,
    unit: "dozen",
    lastUpdated: "2023-03-01",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Egg Farm",
    cost: 1.5,
  },
  {
    id: "INV-013",
    name: "Milk",
    category: "Dairy",
    stock: 18,
    minStock: 20,
    maxStock: 100,
    unit: "L",
    lastUpdated: "2023-03-05",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Dairy",
    cost: 1.0,
  },
  {
    id: "INV-014",
    name: "Cheese",
    category: "Dairy",
    stock: 25,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-03-03",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Cheese Factory",
    cost: 4.0,
  },
  {
    id: "INV-015",
    name: "Apples",
    category: "Fruits",
    stock: 30,
    minStock: 15,
    maxStock: 200,
    unit: "kg",
    lastUpdated: "2023-03-01",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Orchard",
    cost: 1.0,
  },
  {
    id: "INV-016",
    name: "Bananas",
    category: "Fruits",
    stock: 8,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-03-04",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Banana Farm",
    cost: 0.5,
  },
  {
    id: "INV-017",
    name: "Chicken Broth",
    category: "Canned Goods",
    stock: 28,
    minStock: 15,
    maxStock: 150,
    unit: "cans",
    lastUpdated: "2023-03-02",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Canned Goods",
    cost: 1.0,
  },
  {
    id: "INV-018",
    name: "Salmon",
    category: "Seafood",
    stock: 9,
    minStock: 10,
    maxStock: 50,
    unit: "kg",
    lastUpdated: "2023-03-05",
    status: "Low Stock",
    expirationDate: "2023-03-15",
    supplier: "Local Seafood",
    cost: 8.0,
  },
  {
    id: "INV-019",
    name: "Olive Oil",
    category: "Condiments",
    stock: 12,
    minStock: 5,
    maxStock: 50,
    unit: "L",
    lastUpdated: "2023-03-01",
    status: "In Stock",
    expirationDate: "2023-03-15",
    supplier: "Global Olive Oil",
    cost: 5.0,
  },
  {
    id: "INV-020",
    name: "Salt",
    category: "Spices",
    stock: 40,
    minStock: 10,
    maxStock: 100,
    unit: "kg",
    lastUpdated: "2023-02-28",
    status: "In Stock",
    expirationDate: "2024-02-28",
    supplier: "Global Spice Traders",
    cost: 0.8,
  },
];

// Define the structure for stock movement logs
type StockMovementType = "add" | "remove" | "adjust" | "reorder";

interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: StockMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  timestamp: string;
  user: string;
  notes?: string;
}

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [showMovementLog, setShowMovementLog] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<
    (typeof inventoryItems)[0] | null
  >(null);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [supplierFilter, setSupplierFilter] = useState<string>("");
  const [expiringFilter, setExpiringFilter] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique categories and suppliers for filters
  const categories = Array.from(
    new Set(inventoryItems.map((item) => item.category))
  );
  const suppliers = Array.from(
    new Set(inventoryItems.map((item) => item.supplier))
  );

  // Calculate expiration status for items
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  // Enhanced filter function
  const filteredItems = inventoryItems.filter((item) => {
    // Text search filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;

    // Status filter
    const matchesStatus = statusFilter ? item.status === statusFilter : true;

    // Supplier filter
    const matchesSupplier = supplierFilter
      ? item.supplier === supplierFilter
      : true;

    // Expiring soon filter
    const itemExpDate = new Date(item.expirationDate);
    const isExpiringSoon = expiringFilter
      ? itemExpDate <= sevenDaysLater && itemExpDate >= today
      : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesSupplier &&
      isExpiringSoon
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to update stock levels
  const updateStock = (
    itemId: string,
    newQuantity: number,
    type: StockMovementType,
    notes?: string
  ) => {
    setInventoryItems((prev) => {
      const updatedItems = prev.map((item) => {
        if (item.id === itemId) {
          const previousStock = item.stock;
          const newStock =
            type === "remove"
              ? item.stock - newQuantity
              : type === "add"
              ? item.stock + newQuantity
              : newQuantity;

          // Create movement log
          const movement: StockMovement = {
            id: `MOV-${Date.now()}`,
            itemId,
            itemName: item.name,
            type,
            quantity: newQuantity,
            previousStock,
            newStock,
            timestamp: new Date().toISOString(),
            user: "Current User", // In a real app, this would come from auth
            notes,
          };

          setStockMovements((prev) => [movement, ...prev]);

          // Update status based on new stock level
          const status = newStock < item.minStock ? "Low Stock" : "In Stock";

          return {
            ...item,
            stock: newStock,
            status,
            lastUpdated: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      });

      return updatedItems;
    });
  };

  // Function to handle adding a new item
  const handleAddItem = (values: InventoryItemFormValues) => {
    const newItem = {
      id: `INV-${String(inventoryItems.length + 1).padStart(3, "0")}`,
      name: values.name,
      category: values.category,
      stock: values.stock,
      minStock: values.minStock,
      maxStock: values.maxStock,
      unit: values.unit,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: values.stock < values.minStock ? "Low Stock" : "In Stock",
      expirationDate:
        values.expirationDate || new Date().toISOString().split("T")[0],
      supplier: values.supplier || "Unknown Supplier",
      cost: values.cost || 0,
    };

    setInventoryItems((prev) => [...prev, newItem]);

    // Log the addition
    const movement: StockMovement = {
      id: `MOV-${Date.now()}`,
      itemId: newItem.id,
      itemName: newItem.name,
      type: "add",
      quantity: values.stock,
      previousStock: 0,
      newStock: values.stock,
      timestamp: new Date().toISOString(),
      user: "Current User",
      notes: "New item added to inventory",
    };

    setStockMovements((prev) => [movement, ...prev]);
    setIsFormOpen(false);
  };

  // Function to handle editing an item
  const handleEditItem = (values: InventoryItemFormValues) => {
    if (!currentItem) return;

    setInventoryItems((prev) => {
      return prev.map((item) => {
        if (item.id === currentItem.id) {
          // Log stock changes if the stock value changed
          if (item.stock !== values.stock) {
            const movement: StockMovement = {
              id: `MOV-${Date.now()}`,
              itemId: item.id,
              itemName: item.name,
              type: "adjust",
              quantity: Math.abs(values.stock - item.stock),
              previousStock: item.stock,
              newStock: values.stock,
              timestamp: new Date().toISOString(),
              user: "Current User",
              notes: "Stock adjusted during item edit",
            };

            setStockMovements((prev) => [movement, ...prev]);
          }

          return {
            ...item,
            name: values.name,
            category: values.category,
            stock: values.stock,
            minStock: values.minStock,
            maxStock: values.maxStock,
            unit: values.unit,
            expirationDate: values.expirationDate || item.expirationDate,
            supplier: values.supplier || item.supplier,
            cost: values.cost || item.cost,
            lastUpdated: new Date().toISOString().split("T")[0],
            status: values.stock < values.minStock ? "Low Stock" : "In Stock",
          };
        }
        return item;
      });
    });

    setIsFormOpen(false);
    setCurrentItem(null);
  };

  // Calculate total inventory value
  const totalInventoryValue = inventoryItems
    .reduce((sum, item) => sum + item.stock * item.cost, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMovementLog(!showMovementLog)}
          >
            {showMovementLog ? "Hide Log" : "View Stock Log"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setCurrentItem(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {
                inventoryItems.filter((item) => item.status === "Low Stock")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-red-500" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {
                inventoryItems.filter((item) => {
                  const expDate = new Date(item.expirationDate);
                  return expDate <= sevenDaysLater && expDate >= today;
                }).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-2" />
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {new Intl.NumberFormat("en-IN").format(
                parseFloat(totalInventoryValue)
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      {inventoryItems.filter((item) => item.status === "Low Stock").length >
        0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="py-3">
            <CardTitle className="text-amber-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Low Stock Alerts
            </CardTitle>
            <CardDescription className="text-amber-700">
              {
                inventoryItems.filter((item) => item.status === "Low Stock")
                  .length
              }{" "}
              items are below their minimum stock level.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Stock Movement Log */}
      {showMovementLog && (
        <Card>
          <CardHeader>
            <CardTitle>Stock Movement Log</CardTitle>
            <CardDescription>
              History of all stock changes and movements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Before</TableHead>
                    <TableHead>After</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-muted-foreground py-6"
                      >
                        No stock movements recorded yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          {new Date(movement.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{movement.itemName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              movement.type === "add"
                                ? "success"
                                : movement.type === "remove"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {movement.type.charAt(0).toUpperCase() +
                              movement.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{movement.quantity}</TableCell>
                        <TableCell>{movement.previousStock}</TableCell>
                        <TableCell>{movement.newStock}</TableCell>
                        <TableCell>{movement.user}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {movement.notes || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Manage your inventory items, track stock levels, and set up reorder
            alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2 w-full md:max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant={isFilterOpen ? "default" : "outline"}
                size="icon"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("");
                setStatusFilter("");
                setSupplierFilter("");
                setExpiringFilter(false);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <div className="mb-6 p-4 border rounded-md bg-muted/20">
              <h3 className="text-sm font-medium mb-3">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Supplier
                  </label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={supplierFilter}
                    onChange={(e) => setSupplierFilter(e.target.value)}
                  >
                    <option value="">All Suppliers</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={expiringFilter}
                      onChange={(e) => setExpiringFilter(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Expiring Soon (7 days)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentItems.map((item) => {
                    // Calculate expiration status
                    const expDate = new Date(item.expirationDate);
                    const isExpired = expDate < today;
                    const isExpiringSoon =
                      expDate <= sevenDaysLater && expDate >= today;

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div>{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.id}
                          </div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {item.stock} {item.unit}
                              </span>
                              <span className="text-muted-foreground">
                                {item.stock}/{item.maxStock}
                              </span>
                            </div>
                            <Progress
                              value={(item.stock / item.maxStock) * 100}
                              className="h-2"
                              indicatorClassName={
                                item.stock < item.minStock
                                  ? "bg-destructive"
                                  : item.stock < item.minStock * 1.5
                                  ? "bg-amber-500"
                                  : undefined
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "Low Stock"
                                ? "destructive"
                                : "success"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span>{item.expirationDate}</span>
                            {isExpired && (
                              <Badge variant="destructive" className="ml-2">
                                Expired
                              </Badge>
                            )}
                            {isExpiringSoon && !isExpired && (
                              <Badge
                                variant="outline"
                                className="ml-2 border-amber-500 text-amber-500"
                              >
                                Soon
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.supplier}</TableCell>
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
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentItem(item);
                                  setIsFormOpen(true);
                                }}
                              >
                                Edit Item
                              </DropdownMenuItem>
                              <DropdownMenuItem>View History</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  // Example of adding stock
                                  const quantity = prompt(
                                    "Enter quantity to add:"
                                  );
                                  if (quantity && !isNaN(Number(quantity))) {
                                    updateStock(
                                      item.id,
                                      Number(quantity),
                                      "add",
                                      "Regular stock addition"
                                    );
                                  }
                                }}
                              >
                                Add Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  // Example of removing stock
                                  const quantity = prompt(
                                    "Enter quantity to remove:"
                                  );
                                  if (quantity && !isNaN(Number(quantity))) {
                                    updateStock(
                                      item.id,
                                      Number(quantity),
                                      "remove",
                                      "Regular stock removal"
                                    );
                                  }
                                }}
                              >
                                Remove Stock
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  alert(`Reordering ${item.name}`);
                                  updateStock(
                                    item.id,
                                    item.minStock - item.stock + 10,
                                    "add",
                                    "Automatic restock order"
                                  );
                                }}
                              >
                                Reorder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete ${item.name}?`
                                    )
                                  ) {
                                    setInventoryItems((prev) =>
                                      prev.filter((i) => i.id !== item.id)
                                    );

                                    // Log the deletion
                                    const movement: StockMovement = {
                                      id: `MOV-${Date.now()}`,
                                      itemId: item.id,
                                      itemName: item.name,
                                      type: "remove",
                                      quantity: item.stock,
                                      previousStock: item.stock,
                                      newStock: 0,
                                      timestamp: new Date().toISOString(),
                                      user: "Current User",
                                      notes: "Item deleted from inventory",
                                    };

                                    setStockMovements((prev) => [
                                      movement,
                                      ...prev,
                                    ]);
                                  }
                                }}
                              >
                                Delete Item
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredItems.length)} of{" "}
              {filteredItems.length} items
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Create a window of page numbers around the current page
                  let pageNum = currentPage;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Item Form */}
      <InventoryItemForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleEditItem}
        initialValues={currentItem || undefined}
        title={currentItem ? "Edit Inventory Item" : "Add New Inventory Item"}
        description={
          currentItem
            ? "Make changes to the inventory item"
            : "Add a new item to your inventory"
        }
      />
    </div>
  );
}
