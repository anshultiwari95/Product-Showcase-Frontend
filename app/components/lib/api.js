import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // adjust if your backend is on a different port
});

// ✅ Fetch all categories
export const fetchCategories = async () => {
  try {
    const res = await API.get('/products/categories/all');
    return res.data; // should be array of { slug, name, url }
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
};

// ✅ Fetch products with optional filters
export const fetchProducts = async (category,sort, limit,skip) => {
  try {
    const params = { limit, skip };
    if (category) params.category = category;
    if (sort) params.sort = sort;

    const res = await API.get('/products', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return { products: [], total: 0 };
  }
};

// ✅ Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const res = await API.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return null;
  }
};
