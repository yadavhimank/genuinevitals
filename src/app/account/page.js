"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  Clock,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// Simulated user data
const userData = {
  name: "Himank",
  email: "himank@example.com",
  avatar:
    "https://unsplash.com/photos/a-person-standing-in-front-of-a-white-wall-KHO_jvR6HkA",
  joinedDate: "March 2023",
};

// Recent orders data
const recentOrders = [
  {
    id: "ORD-5723",
    date: "12 Jun 2023",
    status: "Delivered",
    total: 8499,
    items: 3,
  },
  {
    id: "ORD-4289",
    date: "28 May 2023",
    status: "Processing",
    total: 5999,
    items: 2,
  },
];

const accountLinks = [
  {
    title: "Profile",
    description: "Manage your personal information",
    icon: User,
    href: "/account/profile",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Orders",
    description: "Track and manage your purchases",
    icon: ShoppingBag,
    href: "/account/orders",
    color: "bg-green-500/10 text-green-500",
  },
  {
    title: "Wishlist",
    description: "View your saved products",
    icon: Heart,
    href: "/account/wishlist",
    color: "bg-red-500/10 text-red-500",
  },
  {
    title: "Settings",
    description: "Configure your account preferences",
    icon: Settings,
    href: "/account/settings",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Logout",
    description: "Sign out from your account",
    icon: LogOut,
    href: "/logout",
    color: "bg-orange-500/10 text-orange-500",
  },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Overview */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-xl">{userData.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    {userData.email}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Member since {userData.joinedDate}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/account/profile">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {accountLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <motion.div
                  className="p-4 rounded-lg border border-border bg-card/40 backdrop-blur-sm hover:bg-card transition-colors flex items-center gap-4"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-2 rounded-full ${link.color}`}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Account Content */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-primary text-sm hover:underline"
                >
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-border rounded-lg p-4 hover:bg-card transition-colors"
                    >
                      <div className="flex flex-wrap gap-4 justify-between">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {order.date}
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-blue-500/10 text-blue-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{order.total}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-border rounded-lg">
                  <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p>You haven&apos;t placed any orders yet</p>
                  <Link href="/products">
                    <Button className="mt-4">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Payment Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your cards
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Addresses</h3>
                <p className="text-sm text-muted-foreground">
                  Manage delivery locations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">Wishlist</h3>
                <p className="text-sm text-muted-foreground">
                  View saved products
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
