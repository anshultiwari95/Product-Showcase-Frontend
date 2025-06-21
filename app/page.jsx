'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from './components/lib/api.js';
import CategorySortBar from './components/CategorySortBar/CategorySortBar';
import ProductCard from './components/ProductCard/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [limit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const page = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < totalPages) setSkip((page + 1 - 1) * limit);
  };

  const handlePrev = () => {
    if (page > 1) setSkip((page - 1 - 1) * limit);
  };

  const handlePageJump = (pg) => {
    setSkip((pg - 1) * limit);
  };

  const getVisiblePages = () => {
    const range = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (page <= 4) {
        range.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (page >= totalPages - 3) {
        range.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return range;
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(category, sort, limit, skip);
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setLoading(false);
    };
    loadProducts();
  }, [category, sort, skip]);

  useEffect(() => {
    const timeout = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.main
      className="p-6 space-y-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={pageLoaded ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CategorySortBar setCategory={setCategory} setSort={setSort} />
      </motion.div>

      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-60"
        >
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded disabled:opacity-50 transition"
          >
            Prev
          </motion.button>

          <AnimatePresence mode="wait">
            {getVisiblePages().map((pg, idx) =>
              pg === '...' ? (
                <motion.span
                  key={`ellipsis-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-2 py-1 text-gray-400"
                >
                  ...
                </motion.span>
              ) : (
                <motion.button
                  key={pg}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: pg === page ? 1.1 : 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handlePageJump(pg)}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    pg === page
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {pg}
                </motion.button>
              )
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={page === totalPages}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded disabled:opacity-50 transition"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </motion.main>
  );
}
