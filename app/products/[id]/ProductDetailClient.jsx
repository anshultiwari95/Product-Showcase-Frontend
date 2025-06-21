'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ProductDetailClient({ product }) {
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });
  const [reviewList, setReviewList] = useState(product.reviews || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const {
    title, price, discountPercentage, brand, rating, tags, description,
    weight, dimensions, warrantyInformation, shippingInformation,
    availabilityStatus, returnPolicy, images = []
  } = product;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) return;

    setReviewList([
      ...reviewList,
      {
        reviewerName: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
      },
    ]);
    setNewReview({ name: '', rating: '', comment: '' });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (diff < -50) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <motion.div
      layoutId={`product-${product.id}`}
      className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8"
    >
      {/* Back Button */}
      <Link href="/" className="inline-block mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Products
        </motion.button>
      </Link>

      {/* Product Images */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={title}
              loading="lazy"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full h-80 object-contain rounded-lg border shadow-md hover:scale-105 transition-transform"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            />
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                loading="lazy"
                alt={`thumb-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-16 w-16 object-cover rounded border cursor-pointer transition-transform hover:scale-105 ${
                  currentIndex === idx ? 'ring-2 ring-indigo-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">{description}</p>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-indigo-600">${price}</span>
            <span className="text-sm text-green-600">-{discountPercentage}%</span>
          </div>
          <div className="text-yellow-500">
            {'⭐'.repeat(Math.round(rating))} <span className="text-sm text-gray-500 ml-2">({rating})</span>
          </div>
          <p className="text-sm text-gray-600">Brand: <span className="font-medium">{brand}</span></p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">#{tag}</span>
            ))}
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <label className="text-sm font-medium">Qty:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-center"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-4 border-b">
          {['details', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-semibold capitalize ${
                activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-gray-700 space-y-2"
              >
                <p><strong>Availability:</strong> {availabilityStatus}</p>
                <p><strong>Weight:</strong> {weight}g</p>
                <p><strong>Dimensions:</strong> {dimensions?.width} x {dimensions?.height} x {dimensions?.depth} cm</p>
                <p><strong>Warranty:</strong> {warrantyInformation}</p>
                <p><strong>Shipping:</strong> {shippingInformation}</p>
                <p><strong>Return Policy:</strong> {returnPolicy}</p>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {reviewList.length === 0 ? (
                  <p className="text-gray-500">No reviews yet.</p>
                ) : (
                  reviewList.map((review, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                      className="border p-4 rounded"
                    >
                      <div className="flex justify-between items-center">
                        <strong>{review.reviewerName}</strong>
                        <span className="text-yellow-500">⭐ {review.rating}</span>
                      </div>
                      <p className="italic text-gray-600 mt-1">"{review.comment}"</p>
                      <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                    </motion.div>
                  ))
                )}

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold">Add Your Review</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <textarea
                    placeholder="Your Comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                  >
                    Submit Review
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
