import { ShoppingCart } from "lucide-react";

function ProductCard({ product = {} }) {
  const defaultProduct = {
    name: "Classic T-Shirt",

    description:
      "Premium quality cotton t-shirt with modern fit and soft fabric.",

    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

    price: 49,

    colors: ["blue", "black"],
  };

  // Merge API data with defaults
  const finalProduct = {
    ...defaultProduct,
    ...product,
  };

  const { name, description, image, price, colors } = finalProduct;

  return (
    <div className=" bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="bg-gray-100 aspect-4/4.5 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        <p className=" hidden sm:block text-sm text-gray-500 mt-2 line-clamp-2">
          {description}
        </p>

        {/* Colors */}
        <div className="flex items-center gap-3 mt-3">
          <p className="text-xs text-gray-500 shrink-0">Color</p>

          <div className="flex items-center gap-2 flex-wrap">
            {colors?.map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300 shrink-0"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${price}
          </span>

          <button
            type="button"
            className="flex items-center gap-1.5 whitespace-nowrap border border-gray-200 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium hover:bg-gray-100 transition-colors shrink-0"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
