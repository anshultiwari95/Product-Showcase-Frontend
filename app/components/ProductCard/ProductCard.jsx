'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <motion.div
        layoutId={`product-${product.id}`} // Shared transition wrapper
        className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform h-full flex flex-col"
      >
        {/* Image container with layoutId */}
        <motion.div
          layoutId={`image-${product.id}`} // Shared transition for image
          className="h-48 w-full flex items-center justify-center overflow-hidden bg-gray-50 rounded"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-grow mt-3 space-y-1">
          <h3 className="text-md font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
          <p className="text-sm text-gray-500">${product.price}</p>
        </div>
      </motion.div>
    </Link>
  );
}
