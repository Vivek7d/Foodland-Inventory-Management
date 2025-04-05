<<<<<<< HEAD
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import { Camera, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as tf from "@tensorflow/tfjs";
// Import TensorFlow backends
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as blazeface from "@tensorflow-models/blazeface";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster for notifications

// Define the prediction type based on blazeface model output
interface FacePrediction {
  topLeft: [number, number];
  bottomRight: [number, number];
  landmarks: number[][];
  probability: number;
}

export default function FacialAuthentication() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load the BlazeFace model and set up TensorFlow
  useEffect(() => {
    const setupTensorFlow = async () => {
      // Set the backend explicitly and wait for it to be ready
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TensorFlow backend ready:", tf.getBackend());

      try {
        const loadedModel = await blazeface.load();
        setModel(loadedModel);
        console.log("Face detection model loaded");
      } catch (error) {
        console.error("Error loading BlazeFace model:", error);
      }
    };

    setupTensorFlow();
  }, []);

  // Function to detect faces and draw boxes
  const detectFaces = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Match canvas size to video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      // Detect faces
      const predictions = (await model.estimateFaces(
        video,
        false
      )) as FacePrediction[];

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw rectangles around faces
      predictions.forEach((prediction) => {
        const start = prediction.topLeft;
        const end = prediction.bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        ctx.strokeRect(start[0], start[1], size[0], size[1]);
      });

      // Continue detection if camera is active
      if (isCameraActive) {
        requestAnimationFrame(detectFaces);
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      if (isCameraActive) {
        requestAnimationFrame(detectFaces);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraActive(true);
          detectFaces();

          // Show toast after 2 seconds
          setTimeout(() => {
            toast.success("Facial Authentication is successfully done.", {
              duration: Infinity,
              position: "top-right",
            });
          }, 2000);
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Failed to access camera. Please ensure camera permissions are granted."
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleFaceLogin = () => {
    // Show success toast notification after 1 second
    setTimeout(() => {
      toast.success("Identity confirmed! Welcome back.", {
        duration: Infinity,
        position: "top-right",
      });
    }, 2000);

    // Delay navigation for 5 seconds
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  const handleAdminLogin = () => {
    // Show success toast notification
    toast.success("Admin authentication successful!", {
      duration: Infinity,
      position: "top-right",
    });

    // Delay navigation for 3 seconds
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            Foodland Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="user"
                className="flex items-center justify-center"
              >
                <User className="w-4 h-4 mr-2" />
                User Login
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="flex items-center justify-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-2">
              <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              {!isCameraActive ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={startCamera}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Activate Camera
                </Button>
              ) : (
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={stopCamera}
                >
                  Deactivate Camera
                </Button>
              )}
              <div className="my-2" /> {/* Small gap between buttons */}
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={handleFaceLogin}
              >
                Confirm Identity
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="admin-username"
                  className="block text-sm font-medium"
                >
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter admin username"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter admin password"
                />
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleAdminLogin}
              >
                Login to Admin Panel
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Toaster component for displaying toasts */}
      <Toaster />
=======
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
                        <span className="font-medium">₹1,99,369</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">
                      Customer Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full border-[25px] border-emerald-500/80 border-r-blue-500/80 border-b-amber-500/80 border-l-violet-500/80 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-background rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-1 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs">18-24</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs">25-34</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-xs">35-44</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                        <span className="text-xs">45+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">
                      Product Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] relative">
                      <div className="absolute inset-0 flex flex-col justify-end">
                        <div className="grid grid-cols-3 gap-2 h-[80%]">
                          <div className="flex flex-col justify-end">
                            <div
                              className="bg-primary rounded-t-md w-full"
                              style={{ height: "65%" }}
                            ></div>
                          </div>
                          <div className="flex flex-col justify-end">
                            <div
                              className="bg-primary/80 rounded-t-md w-full"
                              style={{ height: "85%" }}
                            ></div>
                          </div>
                          <div className="flex flex-col justify-end">
                            <div
                              className="bg-primary/60 rounded-t-md w-full"
                              style={{ height: "40%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-muted-foreground">
                        <span>Product A</span>
                        <span>Product B</span>
                        <span>Product C</span>
                      </div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Product A</span>
                        <span className="text-sm font-medium">₹45,290</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Product B</span>
                        <span className="text-sm font-medium">₹38,750</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Product C</span>
                        <span className="text-sm font-medium">₹27,430</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Sales Forecasting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] relative">
                      <div className="absolute inset-x-0 bottom-0 top-10">
                        <div className="h-full w-full flex items-end">
                          <div className="relative h-full w-full">
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 border-t border-dashed border-emerald-500/50 h-1/2"></div>
                            <svg
                              className="absolute bottom-0 left-0 h-1/2 w-full"
                              preserveAspectRatio="none"
                              viewBox="0 0 100 50"
                            >
                              <path
                                d="M0,50 Q10,30 20,35 T40,15 T60,25 T80,10 T100,20 V50 H0"
                                fill="none"
                                stroke="rgb(16, 185, 129)"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Projected Q3
                        </span>
                        <span className="font-medium">₹4,85,000</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          Growth Rate
                        </span>
                        <span className="font-medium text-emerald-500">
                          +12.3%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
>>>>>>> 476b3dd8d1de004ae9e2ce54f8c6dc316c1f2aab
    </div>
  );
}
