"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ChevronRight,
  CreditCard,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import CartItem from "@/components/shared/CartItem";
import { products } from "@/lib/data";

// Simulated cart data
const initialCartItems = [
  {
    id: 1,
    ...products[0],
    quantity: 1,
    size: products[0].sizes[0].name,
    flavor: products[0].flavors[0],
  },
  {
    id: 2,
    ...products[1],
    quantity: 2,
    size: products[1].sizes[0].name,
    flavor: products[1].flavors[1],
  },
];

const calculateSubtotal = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);
};

const calculateShipping = (subtotal) => {
  // Free shipping for orders over ₹7500
  return subtotal >= 7500 ? 0 : 250;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart data
    const timer = setTimeout(() => {
      setCartItems(initialCartItems);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const subtotal = Math.round(calculateSubtotal(cartItems));
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Shopping Cart</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading your cart...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-16 bg-card/40 backdrop-blur-sm border border-border rounded-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-muted/50 rounded-full mb-4">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Link href="/products">
            <Button>
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-6">
              <div className="hidden sm:grid grid-cols-3 pb-4 border-b border-border mb-4">
                <div className="col-span-2 font-medium">Product</div>
                <div className="text-right font-medium">Subtotal</div>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </AnimatePresence>

              <div className="mt-6 text-sm">
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-500">Free</span>
                  ) : (
                    <span>₹{shipping}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Free shipping on orders over ₹7500
                  </div>
                )}
              </div>

              <div className="border-t border-border my-4 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button className="w-full mt-4">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>We accept:</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="w-12 h-8 bg-card flex items-center justify-center rounded border border-border">
                    Visa
                  </div>
                  <div className="w-12 h-8 bg-card flex items-center justify-center rounded border border-border">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-card flex items-center justify-center rounded border border-border">
                    Amex
                  </div>
                  <div className="w-12 h-8 bg-card flex items-center justify-center rounded border border-border">
                    PayPal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
