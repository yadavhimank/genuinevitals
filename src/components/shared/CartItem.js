import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const subtotal = Math.round(
    (item.price - (item.price * (item.discount || 0)) / 100) * quantity
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-4 py-4 border-b border-border"
    >
      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 h-8 w-8 rounded-full text-muted-foreground hover:text-destructive mt-1"
        onClick={handleRemove}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Image */}
      <div className="relative w-20 h-20 overflow-hidden rounded-md shrink-0">
        <Image
          src={item.image || "/images/placeholder.jpg"}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-grow">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium hover:text-primary transition-colors"
        >
          {item.name}
        </Link>

        {item.size && (
          <div className="text-sm text-muted-foreground mt-1">
            Size: {item.size}
          </div>
        )}

        {item.flavor && (
          <div className="text-sm text-muted-foreground">
            Flavor: {item.flavor}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between mt-3">
          {/* Price */}
          <div className="flex items-center">
            {item.discount > 0 ? (
              <div className="flex items-center">
                <span className="font-semibold text-primary">
                  ₹{Math.round(item.price - (item.price * item.discount) / 100)}
                </span>
                <span className="text-muted-foreground line-through ml-2 text-xs">
                  ₹{item.price}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-primary">₹{item.price}</span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="mx-3 w-6 text-center text-sm">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Subtotal - Mobile Only */}
        <div className="flex justify-end mt-2 sm:hidden">
          <span className="font-semibold">Subtotal: ₹{subtotal}</span>
        </div>
      </div>

      {/* Subtotal - Desktop */}
      <div className="hidden sm:block text-right min-w-[80px]">
        <span className="font-semibold">₹{subtotal}</span>
      </div>
    </motion.div>
  );
};

export default CartItem;
