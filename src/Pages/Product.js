import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utility";
import { Loading } from "../Components/Loading/Loading";
import StarRatings from "react-star-ratings";
import { FaTags } from "react-icons/fa";
import { AddToCart } from "../Components/ProductsPageComponents/index";

export const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/products/single-product/${productId}`
      );
      setProduct(data.product);
      setLoading(false);
    })();
  }, [productId]);

  return (
    <div className="pt-14">
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 h-screen">
          <div className="px-5">
            <img
              src={product.image[imageSrc]}
              alt={product.name}
              loading="lazy"
              className="object-contain h-[75vh] ml-auto mr-auto"
            />
            <div className="flex space-x-3">
              {product.image.map((src, index) => (
                <div
                  key={src}
                  className="border-2 border-slate-400 rounded-md px-2 py-1 cursor-pointer"
                  onMouseEnter={() => setImageSrc(index)}
                >
                  <img
                    src={src}
                    alt="images"
                    className="h-20 w-20 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col py-2 px-3">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-lg font-medium my-3">{`Price : ₹${product.price.toLocaleString()}`}</p>
            <StarRatings
              rating={product.rating}
              starRatedColor="#f6d005"
              starSpacing="2px"
              starDimension="20px"
            />
            <div className="flex space-x-2 my-3">
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
            <div className="mt-2 text-sm space-x-3">
              <AddToCart
                isInStock={product.isInStock}
                productId={product._id}
              />
              <button className="py-2 px-3 rounded-sm border-2 font-semibold">
                Add to wishlist
              </button>
            </div>
            <div className="mt-5 px-3">
              <p className="font-semibold text-lg">About the product</p>
              <ul>
                {product.about.map((line, index) => (
                  <li className="list-disc my-1 font-medium" key={index}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
