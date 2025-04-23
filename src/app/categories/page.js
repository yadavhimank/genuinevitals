"use client";
import { categories } from "@/lib/data";
import CategoryCard from "@/components/shared/CategoryCard";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 z-10" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/categories-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 py-16 px-6 md:px-12 text-black">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-shadow">
            Supplement Categories
          </h1>
          <p className="max-w-2xl text-black text-shadow-sm">
            Browse our range of premium supplements organized by category to
            help you find exactly what you need for your fitness journey.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-card/60 backdrop-blur-sm border border-border rounded-lg p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-4">
          Find Your Perfect Supplement
        </h2>
        <p className="text-muted-foreground mb-6">
          Each of our categories contains carefully formulated products designed
          for specific fitness goals. Whether you&apos;re looking to build
          muscle, increase energy, or improve recovery, we have the right
          supplement for you.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-background/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">New to Supplements?</h3>
            <p className="text-sm text-muted-foreground">
              If you&apos;re new to supplements, we recommend starting with our
              protein powders and multivitamins for a solid foundation.
            </p>
          </div>

          <div className="bg-background/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Muscle Building</h3>
            <p className="text-sm text-muted-foreground">
              For muscle growth, explore our protein, creatine, and mass gainer
              categories for the best results.
            </p>
          </div>

          <div className="bg-background/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Performance & Recovery
            </h3>
            <p className="text-sm text-muted-foreground">
              Enhance your workouts with pre-workouts and support recovery with
              BCAAs and other recovery supplements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
