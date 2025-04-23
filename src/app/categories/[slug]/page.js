"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/shared/ProductCard";
import ProductFilter from "@/components/shared/ProductFilter";
import { categories, products } from "@/lib/data";
import { applyFilters } from "@/lib/filters";
import { motion } from "framer-motion";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CategoryPage({ params }) {
  const { slug } = params;

  // Find the category based on the slug
  const category = categories.find((cat) => cat.slug === slug);

  // Get all products in this category
  const categoryProducts = products.filter(
    (product) => category && product.categoryId === category.id
  );

  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);
  const [filterOptions, setFilterOptions] = useState({
    categories: category ? [category.id] : [],
    priceRange: null,
    minRating: null,
    tags: [],
    dietary: null,
  });
  const [view, setView] = useState("grid"); // grid or list
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  useEffect(() => {
    setFilteredProducts(applyFilters(products, filterOptions));
  }, [filterOptions]);

  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
  };

  const toggleFiltersVisibility = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  // If category doesn't exist, show error
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The category you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/categories">
          <Button>View All Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 z-10" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${
              category.image || "/images/products-banner.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 py-16 px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-shadow">
            {category.name}
          </h1>
          <p className="max-w-2xl text-gray-200 text-shadow-sm">
            {category.description}
          </p>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={toggleFiltersVisibility}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div
          className={`lg:w-1/4 ${
            isFiltersVisible ? "block" : "hidden lg:block"
          }`}
        >
          <ProductFilter
            onFilterChange={handleFilterChange}
            activeFilters={filterOptions}
          />
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {/* View Options & Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
            <div className="flex space-x-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                className="w-9 h-9"
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                className="w-9 h-9"
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <Button
                onClick={() =>
                  setFilterOptions({
                    categories: [category.id],
                    priceRange: null,
                    minRating: null,
                    tags: [],
                    dietary: null,
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
