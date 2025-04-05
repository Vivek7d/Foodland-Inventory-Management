import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download, FileText, Filter, PieChart, Plus, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const reports = [
  {
    id: "REP-001",
    name: "Monthly Sales Report",
    type: "Sales",
    generated: "2023-03-01",
    size: "1.2 MB",
    format: "PDF",
  },
  {
    id: "REP-002",
    name: "Inventory Status Report",
    type: "Inventory",
    generated: "2023-03-01",
    size: "850 KB",
    format: "XLSX",
  },
  {
    id: "REP-003",
    name: "Supplier Performance Q1",
    type: "Supplier",
    generated: "2023-03-01",
    size: "1.5 MB",
    format: "PDF",
  },
  {
    id: "REP-004",
    name: "Weekly Order Summary",
    type: "Orders",
    generated: "2023-03-05",
    size: "720 KB",
    format: "PDF",
  },
  {
    id: "REP-005",
    name: "Delivery Time Analysis",
    type: "Logistics",
    generated: "2023-03-04",
    size: "950 KB",
    format: "XLSX",
  },
  {
    id: "REP-006",
    name: "Product Category Performance",
    type: "Sales",
    generated: "2023-03-03",
    size: "1.1 MB",
    format: "PDF",
  },
  {
    id: "REP-007",
    name: "Customer Satisfaction Survey",
    type: "Customer",
    generated: "2023-03-02",
    size: "680 KB",
    format: "PDF",
  },
  {
    id: "REP-008",
    name: "Waste Management Report",
    type: "Operations",
    generated: "2023-03-01",
    size: "540 KB",
    format: "PDF",
  },
]

const auditLogs = [
  {
    id: "LOG-001",
    action: "User Login",
    user: "admin@foodland.com",
    timestamp: "2023-03-05 09:15:22",
    details: "Successful login from IP 192.168.1.1",
  },
  {
    id: "LOG-002",
    action: "Inventory Update",
    user: "john.doe@foodland.com",
    timestamp: "2023-03-05 10:23:45",
    details: "Updated stock level for item INV-001 from 10 to 5 units",
  },
  {
    id: "LOG-003",
    action: "Order Created",
    user: "jane.smith@foodland.com",
    timestamp: "2023-03-05 11:05:17",
    details: "Created new order ORD-1234 for Restaurant ABC",
  },
  {
    id: "LOG-004",
    action: "Supplier Added",
    user: "admin@foodland.com",
    timestamp: "2023-03-05 13:45:30",
    details: "Added new supplier SUP-009 'Organic Produce Co.'",
  },
  {
    id: "LOG-005",
    action: "Order Status Update",
    user: "john.doe@foodland.com",
    timestamp: "2023-03-05 14:12:08",
    details: "Updated order ORD-1230 status from 'Shipped' to 'Delivered'",
  },
  {
    id: "LOG-006",
    action: "Report Generated",
    user: "jane.smith@foodland.com",
    timestamp: "2023-03-05 15:30:22",
    details: "Generated 'Weekly Order Summary' report",
  },
  {
    id: "LOG-007",
    action: "User Permission Change",
    user: "admin@foodland.com",
    timestamp: "2023-03-05 16:05:47",
    details: "Modified permissions for user 'john.doe@foodland.com'",
  },
  {
    id: "LOG-008",
    action: "System Backup",
    user: "system",
    timestamp: "2023-03-05 00:00:01",
    details: "Automated daily system backup completed successfully",
  },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Audit & Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>Access and download system reports.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.generated}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audit" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Audit Logs</CardTitle>
                  <CardDescription>Track all system activities for transparency.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Action Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="user">User Actions</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                      <SelectItem value="order">Orders</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log ID</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.id}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="max-w-md truncate">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue performance over the past 12 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

