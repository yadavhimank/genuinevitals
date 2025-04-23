import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group shadow-lg" // Added shadow here
    >
      <Link href={`/categories/${category.slug}`}>
        <div className="relative h-96 overflow-hidden  rounded-t-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
          <Image
            src={category.image || "/images/placeholder.jpg"}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white text-shadow">
              {category.name}
            </h3>
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-muted-foreground text-sm mb-4 font-medium line-clamp-2">
            {category.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {category.count} Products
            </span>
            <div className="text-primary group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
