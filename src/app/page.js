"use client";
import Hero from "@/components/shared/Hero";
import ProductCard from "@/components/shared/ProductCard";
import CategoryCard from "@/components/shared/CategoryCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, categories } from "@/lib/data";

export default function Home() {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  // Get featured categories (first 3 categories)
  const featuredCategories = categories.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">
                Our best selling cutting-edge supplements
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:mt-14">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-28 bg-gray-400/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our range of premium supplements categorized for your
              specific goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/categories">
              <Button>
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:mt-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Futurix</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not just another supplement company. We&apos;re
              redefining what&apos;s possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-border rounded-lg bg-card/40 backdrop-blur-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Premium Ingredients
              </h3>
              <p className="text-muted-foreground">
                We use only the highest quality, scientifically-backed
                ingredients for maximum results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-border rounded-lg bg-card/40 backdrop-blur-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Formulas</h3>
              <p className="text-muted-foreground">
                Cutting-edge formulations developed by nutrition scientists and
                fitness experts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-border rounded-lg bg-card/40 backdrop-blur-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Enjoy free shipping on all orders over $75 with fast and
                reliable delivery.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-border rounded-lg bg-card/40 backdrop-blur-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Satisfaction Guarantee
              </h3>
              <p className="text-muted-foreground">
                100% satisfaction guaranteed with our 30-day money-back promise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-[100px] -z-10" />
        <div className="container mx-auto px-4">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Your Training to the Next Level?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of athletes who have transformed their performance
              with Futurix supplements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="glow">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
