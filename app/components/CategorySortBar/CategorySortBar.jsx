"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySortBar({ setCategory, setSort }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/products/categories/all"
        );
        if (Array.isArray(res.data)) setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center">
      <select
        onChange={(e) => setCategory(e.target.value)}
        className=" bg-blue-50 px-4 py-2 rounded-lg"
      >
        <option value="">All Categories</option>
        {categories.map((catObj) =>
          catObj && catObj.slug ? (
            <option key={catObj.slug} value={catObj.slug}>
              {catObj.name}
            </option>
          ) : null
        )}
      </select>

      <select
        onChange={(e) => setSort(e.target.value)}
        className="bg-blue-50 px-4 py-2 rounded-lg"
      >
        <option value="">Sort By</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
