import { fetchProductById } from '../../components/lib/api.js';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage(props) {
  const params = await props.params;
  const productId = params.id;

  const product = await fetchProductById(productId);

  if (!product) {
    return <div className="text-center text-gray-500 mt-10">Product not found.</div>;
  }

  return <ProductDetailClient product={product} />;
}
