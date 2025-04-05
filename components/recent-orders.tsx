import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const orders = [
  {
    id: "ORD-1234",
    customer: "Restaurant ABC",
    date: "2023-03-05",
    amount: "$1,245.89",
    status: "Processing",
  },
  {
    id: "ORD-1233",
    customer: "Cafe XYZ",
    date: "2023-03-05",
    amount: "$845.50",
    status: "Shipped",
  },
  {
    id: "ORD-1232",
    customer: "Hotel Grand",
    date: "2023-03-04",
    amount: "$2,450.00",
    status: "Delivered",
  },
  {
    id: "ORD-1231",
    customer: "Restaurant DEF",
    date: "2023-03-04",
    amount: "$950.25",
    status: "Processing",
  },
  {
    id: "ORD-1230",
    customer: "Bakery 123",
    date: "2023-03-03",
    amount: "$345.75",
    status: "Delivered",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{order.id}</span>
              <Badge
                variant={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "default" : "outline"}
              >
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{order.amount}</span>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

