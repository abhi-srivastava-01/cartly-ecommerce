import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../features/product/productThunk";
function ProductsGrid() {
  const { products, loading, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-center text-gray-500">Loading Products...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-center text-red-500">{error}</h2>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-center text-gray-500">No Products Found</h2>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;