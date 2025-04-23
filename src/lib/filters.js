export const priceRanges = [
  { id: 1, name: "Under ₹2500", min: 0, max: 2500 },
  { id: 2, name: "₹2500 - ₹5000", min: 2500, max: 5000 },
  { id: 3, name: "₹5000 - ₹10000", min: 5000, max: 10000 },
  { id: 4, name: "Over ₹10000", min: 10000, max: 100000 },
];

export const ratings = [
  { id: 1, value: 4, label: "4 Stars & Up" },
  { id: 2, value: 3, label: "3 Stars & Up" },
  { id: 3, value: 2, label: "2 Stars & Up" },
  { id: 4, value: 1, label: "1 Star & Up" },
];

export const tags = [
  "Protein",
  "Pre-Workout",
  "Creatine",
  "Mass Gainer",
  "BCAA",
  "Vitamins",
  "Plant-Based",
  "Vegan",
  "Recovery",
  "Energy",
  "Focus",
  "Strength",
  "Endurance",
  "Stimulant-Free",
];

export const filters = {
  categoryFilter: (products, selectedCategories) => {
    if (!selectedCategories.length) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.categoryId)
    );
  },

  priceFilter: (products, priceRange) => {
    if (!priceRange) return products;
    return products.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );
  },

  ratingFilter: (products, minRating) => {
    if (!minRating) return products;
    return products.filter((product) => product.rating >= minRating);
  },

  tagFilter: (products, selectedTags) => {
    if (!selectedTags.length) return products;
    return products.filter((product) =>
      product.tags.some((tag) => selectedTags.includes(tag))
    );
  },

  dietaryFilter: (products, dietary) => {
    if (!dietary) return products;
    if (dietary === "vegan")
      return products.filter((product) => product.isVegan);
    if (dietary === "gluten-free")
      return products.filter((product) => product.isGlutenFree);
    return products;
  },
};

export const applyFilters = (products, filterOptions) => {
  let filteredProducts = [...products];

  // Apply category filter
  if (filterOptions.categories?.length) {
    filteredProducts = filters.categoryFilter(
      filteredProducts,
      filterOptions.categories
    );
  }

  // Apply price filter
  if (filterOptions.priceRange) {
    filteredProducts = filters.priceFilter(
      filteredProducts,
      filterOptions.priceRange
    );
  }

  // Apply rating filter
  if (filterOptions.minRating) {
    filteredProducts = filters.ratingFilter(
      filteredProducts,
      filterOptions.minRating
    );
  }

  // Apply tag filter
  if (filterOptions.tags?.length) {
    filteredProducts = filters.tagFilter(filteredProducts, filterOptions.tags);
  }

  // Apply dietary filter
  if (filterOptions.dietary) {
    filteredProducts = filters.dietaryFilter(
      filteredProducts,
      filterOptions.dietary
    );
  }

  return filteredProducts;
};
 