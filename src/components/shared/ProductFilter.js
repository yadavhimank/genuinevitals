import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { priceRanges, ratings, tags } from "@/lib/filters";
import { categories } from "@/lib/data";

const ProductFilter = ({ onFilterChange, activeFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState({
    categories: true,
    price: true,
    rating: true,
    tags: true,
    dietary: true,
  });

  const [filters, setFilters] = useState({
    categories: activeFilters.categories || [],
    priceRange: activeFilters.priceRange || null,
    minRating: activeFilters.minRating || null,
    tags: activeFilters.tags || [],
    dietary: activeFilters.dietary || null,
  });

  const toggleFilter = (filterType) => {
    setIsFiltersVisible((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const toggleMobileFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (categoryId) => {
    setFilters((prev) => {
      const updatedCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];

      const updatedFilters = {
        ...prev,
        categories: updatedCategories,
      };

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handlePriceChange = (priceRange) => {
    setFilters((prev) => {
      const updatedPriceRange =
        prev.priceRange?.id === priceRange.id ? null : priceRange;

      const updatedFilters = {
        ...prev,
        priceRange: updatedPriceRange,
      };

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => {
      const updatedRating =
        prev.minRating === rating.value ? null : rating.value;

      const updatedFilters = {
        ...prev,
        minRating: updatedRating,
      };

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleTagChange = (tag) => {
    setFilters((prev) => {
      const updatedTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];

      const updatedFilters = {
        ...prev,
        tags: updatedTags,
      };

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleDietaryChange = (dietary) => {
    setFilters((prev) => {
      const updatedDietary = prev.dietary === dietary ? null : dietary;

      const updatedFilters = {
        ...prev,
        dietary: updatedDietary,
      };

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const resetFilters = () => {
    const resetState = {
      categories: [],
      priceRange: null,
      minRating: null,
      tags: [],
      dietary: null,
    };

    setFilters(resetState);
    onFilterChange(resetState);
  };

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.priceRange !== null ||
      filters.minRating !== null ||
      filters.tags.length > 0 ||
      filters.dietary !== null
    );
  };

  const filterSections = [
    {
      id: "categories",
      title: "Categories",
      content: (
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-primary rounded border-border focus:ring-primary"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "price",
      title: "Price Range",
      content: (
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.id}`}
                name="price-range"
                checked={filters.priceRange?.id === range.id}
                onChange={() => handlePriceChange(range)}
                className="h-4 w-4 text-primary border-border focus:ring-primary"
              />
              <label
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm cursor-pointer"
              >
                {range.name}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "rating",
      title: "Rating",
      content: (
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.id} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating.id}`}
                name="rating"
                checked={filters.minRating === rating.value}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 text-primary border-border focus:ring-primary"
              />
              <label
                htmlFor={`rating-${rating.id}`}
                className="ml-2 text-sm cursor-pointer flex items-center"
              >
                {rating.label}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "tags",
      title: "Product Tags",
      content: (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                filters.tags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: "dietary",
      title: "Dietary Preferences",
      content: (
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="vegan"
              name="dietary"
              checked={filters.dietary === "vegan"}
              onChange={() => handleDietaryChange("vegan")}
              className="h-4 w-4 text-primary border-border focus:ring-primary"
            />
            <label htmlFor="vegan" className="ml-2 text-sm cursor-pointer">
              Vegan
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="gluten-free"
              name="dietary"
              checked={filters.dietary === "gluten-free"}
              onChange={() => handleDietaryChange("gluten-free")}
              className="h-4 w-4 text-primary border-border focus:ring-primary"
            />
            <label
              htmlFor="gluten-free"
              className="ml-2 text-sm cursor-pointer"
            >
              Gluten Free
            </label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Mobile Filter Button & Active Filter Count */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={toggleMobileFilters}
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters() && (
            <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {filters.categories.length +
                (filters.priceRange ? 1 : 0) +
                (filters.minRating ? 1 : 0) +
                filters.tags.length +
                (filters.dietary ? 1 : 0)}
            </div>
          )}
        </Button>

        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Mobile Filter Panel */}
      <motion.div
        className="lg:hidden fixed inset-0 bg-background z-40"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
              onClick={toggleMobileFilters}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-grow overflow-auto p-4 space-y-6">
            {filterSections.map((section) => (
              <div
                key={section.id}
                className="pb-4 border-b border-border last:border-0"
              >
                <button
                  className="flex items-center justify-between w-full text-left font-medium mb-3"
                  onClick={() => toggleFilter(section.id)}
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isFiltersVisible[section.id] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isFiltersVisible[section.id] && section.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Button
              className="flex-1"
              onClick={() => {
                onFilterChange(filters);
                toggleMobileFilters();
              }}
            >
              Apply Filters
            </Button>
            <Button variant="outline" className="flex-1" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filter Products</h3>
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        {filterSections.map((section) => (
          <div
            key={section.id}
            className="pb-4 border-b border-border last:border-0"
          >
            <button
              className="flex items-center justify-between w-full text-left font-medium mb-3"
              onClick={() => toggleFilter(section.id)}
            >
              <span>{section.title}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isFiltersVisible[section.id] ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFiltersVisible[section.id] && section.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
