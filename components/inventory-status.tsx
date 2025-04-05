import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const inventoryItems = [
  {
    id: "INV-001",
    name: "Tomatoes",
    stock: 5,
    minStock: 10,
    maxStock: 100,
    status: "Low Stock",
  },
  {
    id: "INV-002",
    name: "Potatoes",
    stock: 8,
    minStock: 15,
    maxStock: 150,
    status: "Low Stock",
  },
  {
    id: "INV-003",
    name: "Onions",
    stock: 12,
    minStock: 20,
    maxStock: 200,
    status: "Low Stock",
  },
  {
    id: "INV-004",
    name: "Lettuce",
    stock: 7,
    minStock: 10,
    maxStock: 100,
    status: "Low Stock",
  },
  {
    id: "INV-005",
    name: "Carrots",
    stock: 9,
    minStock: 15,
    maxStock: 150,
    status: "Low Stock",
  },
]

export function InventoryStatus() {
  return (
    <div className="space-y-4">
      {inventoryItems.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{item.stock} units</span>
                <Badge variant="destructive">{item.status}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Reorder
            </Button>
          </div>
          <Progress value={(item.stock / item.maxStock) * 100} className="h-2" indicatorClassName="bg-destructive" />
        </div>
      ))}
    </div>
  )
}

