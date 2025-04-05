"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Package2,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Mock data - would come from API in production
const LOW_STOCK_ITEMS = [
  {
    id: 1,
    name: "Organic Apples",
    currentStock: 12,
    threshold: 20,
    category: "Fruits",
  },
  {
    id: 2,
    name: "Whole Wheat Bread",
    currentStock: 5,
    threshold: 15,
    category: "Bakery",
  },
  { id: 3, name: "Milk 1L", currentStock: 8, threshold: 25, category: "Dairy" },
  {
    id: 4,
    name: "Chicken Breast",
    currentStock: 7,
    threshold: 10,
    category: "Meat",
  },
];

const SUPPLIERS = [
  {
    id: 101,
    name: "FreshFarms Produce",
    rating: 4.8,
    deliveryDays: 1,
    categories: ["Fruits", "Vegetables"],
  },
  {
    id: 102,
    name: "Baker's Delight",
    rating: 4.5,
    deliveryDays: 1,
    categories: ["Bakery"],
  },
  {
    id: 103,
    name: "Dairy Deluxe",
    rating: 4.7,
    deliveryDays: 2,
    categories: ["Dairy"],
  },
  {
    id: 104,
    name: "Prime Meats",
    rating: 4.6,
    deliveryDays: 1,
    categories: ["Meat"],
  },
  {
    id: 105,
    name: "Global Foods Inc",
    rating: 4.3,
    deliveryDays: 3,
    categories: ["Fruits", "Vegetables", "Bakery", "Dairy", "Meat"],
  },
];

// Mock supplier prices for each item
const SUPPLIER_PRICES = {
  1: { 101: 1.2, 105: 1.35 },
  2: { 102: 2.5, 105: 2.75 },
  3: { 103: 1.05, 105: 1.15 },
  4: { 104: 6.5, 105: 7.0 },
};

export default function PaymentPage() {
  const [lowStockItems, setLowStockItems] = useState(LOW_STOCK_ITEMS);
  const [suppliers, setSuppliers] = useState(SUPPLIERS);
  const [cart, setCart] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [expandedItem, setExpandedItem] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Add mock recent orders
  const [recentOrders, setRecentOrders] = useState([
    {
      id: "ORD-7523",
      date: "2023-10-15",
      supplier: "FreshFarms Produce",
      items: ["Organic Apples", "Fresh Tomatoes"],
      amount: 2450.75,
      status: "Delivered",
    },
    {
      id: "ORD-6891",
      date: "2023-10-10",
      supplier: "Dairy Deluxe",
      items: ["Milk 1L", "Cheese"],
      amount: 1830.25,
      status: "In Transit",
    },
    {
      id: "ORD-6542",
      date: "2023-10-05",
      supplier: "Prime Meats",
      items: ["Chicken Breast", "Mutton"],
      amount: 3275.5,
      status: "Processing",
    },
  ]);

  // Calculate the total amount in the cart
  const cartTotal = cart.reduce((total, item) => {
    const supplierPrice = SUPPLIER_PRICES[item.id][selectedSuppliers[item.id]];
    return total + supplierPrice * item.quantity;
  }, 0);

  // Get suppliers for a specific item
  const getSuppliersForItem = (item) => {
    return suppliers.filter((supplier) =>
      supplier.categories.includes(item.category)
    );
  };

  // Add item to cart
  const addToCart = (item, supplierId, quantity) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already in cart
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity,
      };
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity }]);
    }

    // Set selected supplier for this item
    setSelectedSuppliers({
      ...selectedSuppliers,
      [item.id]: supplierId,
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));

    // Also remove selected supplier
    const updatedSuppliers = { ...selectedSuppliers };
    delete updatedSuppliers[itemId];
    setSelectedSuppliers(updatedSuppliers);
  };

  // Handle checkout process
  const handleCheckout = () => {
    // In a real app, this would handle payment processing
    if (checkoutStep === 1) {
      setCheckoutStep(2);
    } else {
      // Generate a random order number
      const newOrderNumber = `ORD-${Math.floor(Math.random() * 10000)}`;
      setOrderNumber(newOrderNumber);
      setOrderPlaced(true);

      // Reset cart and checkout process
      // In a real app, this would happen after successful payment
      setTimeout(() => {
        setCart([]);
        setSelectedSuppliers({});
        setCheckoutStep(1);
        setOrderPlaced(false);
      }, 5000);
    }
  };

  // Function to get appropriate status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "In Transit":
        return "text-blue-600 bg-blue-100";
      case "Processing":
        return "text-amber-600 bg-amber-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Stock Purchase & Payment Gateway
      </h1>

      {orderPlaced ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Order Successfully Placed!
          </h2>
          <p className="text-green-700 mb-4">
            Your order #{orderNumber} has been placed successfully.
          </p>
          <p className="text-gray-600">
            You will receive confirmation and tracking details shortly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Low Stock Items Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-amber-500 mr-2" />
                <h2 className="text-xl font-semibold">Low Stock Items</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="py-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setExpandedItem(
                          expandedItem === item.id ? null : item.id
                        )
                      }
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Current Stock:{" "}
                          <span className="text-red-500 font-medium">
                            {item.currentStock}
                          </span>{" "}
                          / Threshold: {item.threshold}
                        </p>
                      </div>
                      <button className="text-blue-500">
                        {expandedItem === item.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </button>
                    </div>

                    {expandedItem === item.id && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Available Suppliers
                        </h4>
                        <div className="space-y-3">
                          {getSuppliersForItem(item).map((supplier) => {
                            const price = SUPPLIER_PRICES[item.id][supplier.id];
                            return (
                              <div
                                key={supplier.id}
                                className="flex justify-between items-center bg-white p-3 rounded border"
                              >
                                <div>
                                  <p className="font-medium">{supplier.name}</p>
                                  <div className="flex items-center text-sm">
                                    <span className="text-yellow-500 mr-1">
                                      ★
                                    </span>
                                    <span>{supplier.rating}</span>
                                    <span className="mx-2">•</span>
                                    <span>
                                      Delivery: {supplier.deliveryDays} day
                                      {supplier.deliveryDays > 1 ? "s" : ""}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    ₹{price.toFixed(2)} per unit
                                  </p>
                                  <div className="flex items-center mt-1">
                                    <input
                                      type="number"
                                      min="1"
                                      defaultValue="10"
                                      className="w-16 p-1 border rounded mr-2 text-center"
                                      id={`qty-${item.id}-${supplier.id}`}
                                    />
                                    <button
                                      className="bg-blue-500 text-white text-sm py-1 px-3 rounded hover:bg-blue-600"
                                      onClick={() =>
                                        addToCart(
                                          item,
                                          supplier.id,
                                          parseInt(
                                            document.getElementById(
                                              `qty-${item.id}-${supplier.id}`
                                            ).value
                                          )
                                        )
                                      }
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shopping Cart Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center mb-4">
                <ShoppingCart className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold">Purchase Cart</h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <p className="text-sm text-gray-400">
                    Add items from the low stock list
                  </p>
                </div>
              ) : (
                <div>
                  <div className="divide-y divide-gray-200 mb-4">
                    {cart.map((item) => {
                      const supplierPrice =
                        SUPPLIER_PRICES[item.id][selectedSuppliers[item.id]];
                      const supplier = suppliers.find(
                        (s) => s.id === selectedSuppliers[item.id]
                      );

                      return (
                        <div key={item.id} className="py-3">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                {supplier?.name} • ₹{supplierPrice.toFixed(2)} ×{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-start">
                              <p className="font-medium">
                                ₹{(supplierPrice * item.quantity).toFixed(2)}
                              </p>
                              <button
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {checkoutStep === 2 && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <div className="space-y-2">
                        <div
                          className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                            selectedPaymentMethod === "card"
                              ? "border-blue-500 bg-blue-50"
                              : ""
                          }`}
                          onClick={() => setSelectedPaymentMethod("card")}
                        >
                          <CreditCard
                            className="text-gray-500 mr-2"
                            size={20}
                          />
                          <span>Credit/Debit Card</span>
                        </div>
                        <div
                          className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                            selectedPaymentMethod === "bank"
                              ? "border-blue-500 bg-blue-50"
                              : ""
                          }`}
                          onClick={() => setSelectedPaymentMethod("bank")}
                        >
                          <DollarSign
                            className="text-gray-500 mr-2"
                            size={20}
                          />
                          <span>Net Banking</span>
                        </div>
                        <div
                          className={`border rounded-lg p-3 flex items-center cursor-pointer ${
                            selectedPaymentMethod === "upi"
                              ? "border-blue-500 bg-blue-50"
                              : ""
                          }`}
                          onClick={() => setSelectedPaymentMethod("upi")}
                        >
                          <TrendingUp
                            className="text-gray-500 mr-2"
                            size={20}
                          />
                          <span>UPI / Wallet</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium"
                    onClick={handleCheckout}
                  >
                    {checkoutStep === 1
                      ? "Proceed to Payment"
                      : "Complete Purchase"}
                  </button>

                  {checkoutStep === 2 && (
                    <button
                      className="w-full mt-2 border border-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium"
                      onClick={() => setCheckoutStep(1)}
                    >
                      Back to Cart
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Purchase History & Tracking */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Package2 className="text-purple-500 mr-2" />
          <h2 className="text-xl font-semibold">Recent Purchase Orders</h2>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No recent purchase orders to display
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Supplier
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.supplier}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      ₹{order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-right">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Orders →
          </button>
        </div>
      </div>
    </div>
  );
}
