import { useState } from "react";
import { useNavigate } from "react-router";
import { FaTags } from "react-icons/fa";
import { ToggleWishlist } from "./ToggleWishlist";
import { AddToCart } from "./AddToCart";

export const Product = ({ product }) => {
  const trunc = (s) => (s.length < 21 ? s : `${s.slice(0, 21)}...`);
  const navigate = useNavigate();
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div
      className="flex flex-col bg-white shadow-md rounded-sm cursor-pointer h-[27rem] p-2"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="flex-grow p-2 relative">
        <img
          src={product.image[imgIndex]}
          alt={product.name}
          className="w-full h-60 object-contain"
          loading="lazy"
          onMouseEnter={() => setImgIndex(1)}
          onMouseLeave={() => setImgIndex(0)}
        />
        <div className="absolute top-0 right-0">
          <ToggleWishlist productId={product._id} />
        </div>
        <div className="">
          <p className="m-1 font-medium">{trunc(product.name)}</p>
        </div>
        <p className="font-semibold text-sm py-1">{`₹${product.price.toLocaleString()}`}</p>
        <div className="space-y-2">
          {product.freeShipping && (
            <div className="py-1 px-2 bg-slate-300 rounded-md text-xs max-w-fit">
              <FaTags className="inline mr-1" /> Free Shipping
            </div>
          )}
          {product.fastDelivery && (
            <div className="py-1 px-2 bg-slate-300 rounded-md text-xs max-w-fit">
              <FaTags className="inline mr-1" />
              Fast Delivery
            </div>
          )}
        </div>
      </div>
      <AddToCart productId={product._id} isInStock={product.isInStock} />
    </div>
  );
};
