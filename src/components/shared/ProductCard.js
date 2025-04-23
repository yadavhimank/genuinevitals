"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col bg-card hover:bg-card/90 transition-all duration-300 group">
          <div className="relative pt-[100%] overflow-hidden">
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}

            {product.isVegan && (
              <div className="absolute top-2 right-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Vegan
              </div>
            )}

            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </Link>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/40 backdrop-blur-sm border-white/50 hover:bg-background/60 hover:border-white text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Quick View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary/90 backdrop-blur-sm border-transparent hover:bg-primary hover:border-transparent text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="flex flex-col flex-grow p-4">
            <div className="mb-1 flex items-center">
              <div className="flex mr-2">{renderStars(product.rating)}</div>
              <span className="text-xs text-muted-foreground font-medium">
                ({product.rating.toFixed(1)})
              </span>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="group-hover:text-primary transition-colors"
            >
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2 font-medium">
              {product.description}
            </p>

            <div className="flex items-center mt-auto">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="font-bold text-primary text-lg">
                    ₹{Math.round(discountedPrice)}
                  </span>
                  <span className="text-muted-foreground line-through ml-2 text-sm font-medium">
                    ₹{product.price}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-primary text-lg">
                  ₹{product.price}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="relative h-[300px]">
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-md"
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(product.rating)}</div>
                <span className="text-sm text-muted-foreground font-medium">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
              <p className="text-muted-foreground mb-4 font-medium">
                {product.description}
              </p>

              <div className="border-t border-border pt-4 mb-4">
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="space-y-1">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {product.flavors?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Available Flavors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium"
                      >
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 mt-4">
                {discountedPrice ? (
                  <div className="flex items-center">
                    <span className="font-bold text-2xl text-primary">
                      ₹{Math.round(discountedPrice)}
                    </span>
                    <span className="text-muted-foreground line-through ml-2 font-medium">
                      ₹{product.price}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-2xl text-primary">
                    ₹{product.price}
                  </span>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <Button className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Link href={`/products/${product.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
