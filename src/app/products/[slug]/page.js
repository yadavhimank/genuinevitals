"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getProductsByCategory } from "@/lib/data";
import ProductCard from "@/components/shared/ProductCard";
import { Card } from "@/components/ui/Card";

export default function ProductDetail({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedFlavor, setSelectedFlavor] = useState(
    product?.flavors?.[0] || null
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  // Get related products (same category)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : null;

  const finalPrice = selectedSize
    ? selectedSize.price
    : discountedPrice || product.price;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-yellow-500"
            : i < rating
            ? "text-yellow-500 fill-yellow-500 opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card/40 backdrop-blur-sm">
            <Image
              src={selectedImage || product.image || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border-white/20 text-primary hover:text-primary hover:bg-background/60"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Image Thumbnails */}
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                selectedImage === product.image || !selectedImage
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(product.image)}
            >
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
            {product.images?.map((img, index) => (
              <button
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === img
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img || "/images/placeholder.jpg"}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {product.name}
          </h1>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-muted-foreground">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center mb-6">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ₹{Math.round(discountedPrice)}
                </span>
                <span className="text-xl text-muted-foreground line-through ml-3">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ₹{product.price}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize?.name === size.name
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.name}
                    {size.price !== product.price && (
                      <span className="ml-1 text-sm text-muted-foreground">
                        ₹{size.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavors */}
          {product.flavors?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Flavor</h3>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flavor, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md border ${
                      selectedFlavor === flavor
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary"
                    }`}
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-md rounded-r-none"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-16 flex items-center justify-center border-y border-border">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-md rounded-l-none"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Product Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={() => alert(`Added ${product.name} to cart!`)}
            >
              <ShoppingCart className="h-10 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 gap-2">
              <Heart className="h-10 w-5" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
