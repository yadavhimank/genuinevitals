"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

// Mock order data
const orders = [
  {
    id: "ORD-5723",
    date: "12 Jun 2023",
    status: "Delivered",
    total: 8499,
    items: [
      {
        id: 1,
        name: "Quantum Whey Isolate",
        size: "3 lbs",
        flavor: "Chocolate",
        price: 8499,
        quantity: 1,
        image:
          "https://unsplash.com/photos/white-and-black-plastic-bottle-SoYRQMvSUPw",
      },
    ],
    shippingAddress: {
      name: "Himank",
      street: "123 Main Street, Apartment 4B",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "IND8371625493",
    deliveryDate: "15 Jun 2023",
  },
  {
    id: "ORD-4289",
    date: "28 May 2023",
    status: "Processing",
    total: 5999,
    items: [
      {
        id: 2,
        name: "Nova Surge Pre-Workout",
        size: "30 servings",
        flavor: "Blue Raspberry",
        price: 3999,
        quantity: 1,
        image:
          "https://pixabay.com/photos/pre-workout-protein-sports-nutrition-5384473/",
      },
      {
        id: 3,
        name: "Matrix Micronized Creatine",
        size: "300g",
        flavor: "Unflavored",
        price: 2499,
        quantity: 1,
        image:
          "https://pixabay.com/photos/creatine-bodybuilding-supplement-4612639/",
      },
    ],
    shippingAddress: {
      name: "Himank",
      street: "123 Main Street, Apartment 4B",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    paymentMethod: "PayPal",
    trackingNumber: null,
    deliveryDate: null,
  },
  {
    id: "ORD-3105",
    date: "15 Mar 2023",
    status: "Delivered",
    total: 3499,
    items: [
      {
        id: 5,
        name: "Vortex BCAA Complex",
        size: "30 servings",
        flavor: "Watermelon",
        price: 3499,
        quantity: 1,
        image:
          "https://pixabay.com/photos/bcaa-amino-acids-supplement-diet-5987452/",
      },
    ],
    shippingAddress: {
      name: "Himank",
      street: "123 Main Street, Apartment 4B",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "IND7265931452",
    deliveryDate: "20 Mar 2023",
  },
  {
    id: "ORD-2871",
    date: "02 Feb 2023",
    status: "Cancelled",
    total: 11999,
    items: [
      {
        id: 1,
        name: "Quantum Whey Isolate",
        size: "5 lbs",
        flavor: "Vanilla",
        price: 11999,
        quantity: 1,
        image:
          "https://unsplash.com/photos/white-and-black-plastic-bottle-SoYRQMvSUPw",
      },
    ],
    shippingAddress: {
      name: "Himank",
      street: "123 Main Street, Apartment 4B",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India",
    },
    paymentMethod: "Credit Card",
    cancellationReason: "Out of stock",
  },
];

const statusIcons = {
  Processing: <Clock className="h-5 w-5 text-blue-500" />,
  Shipped: <Truck className="h-5 w-5 text-orange-500" />,
  Delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
  Cancelled: <AlertCircle className="h-5 w-5 text-red-500" />,
};

const statusColors = {
  Processing: "bg-blue-500/10 text-blue-500",
  Shipped: "bg-orange-500/10 text-orange-500",
  Delivered: "bg-green-500/10 text-green-500",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/account" className="hover:text-primary transition-colors">
          My Account
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Orders</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search by order ID or product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <select
            className="rounded-md border border-border bg-card px-3 py-2 min-w-[180px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            className="rounded-md border border-border bg-card px-3 py-2 min-w-[180px]"
            defaultValue="newest"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <div className="p-6 border-b border-border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">{order.id}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ordered on {order.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 text-sm ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusIcons[order.status]}
                      {order.status}
                    </div>

                    <span className="font-bold">₹{order.total}</span>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleOrderExpand(order.id)}
                      className="h-8 w-8"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          expandedOrder === order.id ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-md overflow-hidden border border-border shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">{item.name}</h5>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                                <p>Size: {item.size}</p>
                                {item.flavor && <p>Flavor: {item.flavor}</p>}
                                <p>Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium mt-2">₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tracking Info for non-cancelled orders */}
                      {order.status !== "Cancelled" && (
                        <div className="mt-8">
                          <h4 className="font-semibold mb-4">
                            Shipping Information
                          </h4>
                          <div className="border border-border rounded-md p-4">
                            {order.trackingNumber ? (
                              <div>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">
                                      Tracking Number
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {order.trackingNumber}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Track Order
                                  </Button>
                                </div>
                                {order.deliveryDate && (
                                  <div className="mt-3 pt-3 border-t border-border">
                                    <p className="font-medium">Delivery Date</p>
                                    <p className="text-sm text-muted-foreground">
                                      {order.deliveryDate}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-muted-foreground text-sm">
                                Tracking information will be available once your
                                order ships.
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Cancellation info */}
                      {order.status === "Cancelled" && (
                        <div className="mt-8">
                          <h4 className="font-semibold mb-4">
                            Cancellation Information
                          </h4>
                          <div className="border border-border rounded-md p-4 bg-red-500/5">
                            <p className="text-sm">
                              <span className="font-medium">Reason: </span>
                              {order.cancellationReason || "No reason provided"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h4 className="font-semibold mb-4">Order Summary</h4>
                      <div className="border border-border rounded-md p-4 space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Shipping Address</h5>
                          <div className="text-sm text-muted-foreground">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}{" "}
                              {order.shippingAddress.zipCode}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <h5 className="font-medium mb-2">Payment Method</h5>
                          <p className="text-sm text-muted-foreground">
                            {order.paymentMethod}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <h5 className="font-medium mb-2">Price Details</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span>₹{order.total}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Shipping
                              </span>
                              <span className="text-green-500">Free</span>
                            </div>

                            <div className="flex justify-between font-medium pt-2 border-t border-border">
                              <span>Total</span>
                              <span>₹{order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>

                        {order.status !== "Cancelled" &&
                          order.status !== "Delivered" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                            >
                              Cancel Order
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card/40 backdrop-blur-sm border border-border rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? "No orders match your search criteria"
              : "You haven't placed any orders yet"}
          </p>
          {!searchQuery && (
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
