import React from "react";
import BuyNowTextLinks from "../Components/BuyNowTextLinks";
import { useNavigate } from "react-router";
import { useProducts } from "../Contexts/productsContext";
import { Loading } from "../Components/Loading";

export const Home = () => {
  const navigate = useNavigate();
  const { loading, featuredProducts, categories } = useProducts();

  return (
    <div className="mt-10 px-5 lg:mt-3 md:px-16 text-center">
      {loading ? (
        <Loading withContainer={true} />
      ) : (
        <>
          <div className="text-center">
            <img
              src={featuredProducts[4]?.imgSrc}
              alt={featuredProducts[4]?.alt}
              loading="lazy"
            />
            <BuyNowTextLinks link={featuredProducts[4]?.productId} />
          </div>
          <section>
            <div className="text-center mt-5">
              <h2 className="text-2xl md:text-4xl font-bold">
                Featured Products
              </h2>
            </div>
            <div className="mt-2">
              {featuredProducts.slice(0, 3).map((product) => {
                return (
                  <div
                    key={product._id}
                    className="md:flex md:items-center md:even:flex-row-reverse md:mt-5"
                  >
                    <img
                      src={product.imgSrc}
                      alt={product.alt}
                      loading="lazy"
                      className="h-[70%] w-full md:w-1/2 md:h-[80vh] object-cover"
                    />
                    <div className="h-[20vh] md:h-auto md:w-1/2">
                      <div className="flex justify-center items-center text-xl md:text-2xl tracking-wide font-semibold ">
                        {product.name}
                      </div>
                      <BuyNowTextLinks link={product.productId} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="m-4 text-center">
            <div className="">
              <h2 className="text-2xl md:text-4xl font-bold my-8">
                Categories
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 md:gap-8">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="cursor-pointer bg-slate-600 relative flex justify-center items-center"
                  onClick={() =>
                    navigate({
                      pathname: "products",
                      search: `?category=${category.name.toLowerCase()}`,
                    })
                  }
                >
                  <img
                    src={category.imgSrc}
                    alt={category.alt}
                    className="object-cover w-full h-[40vh] inline opacity-20 hover:opacity-100"
                  />
                  <h2 className="text-2xl font-semibold absolute text-white z-10">
                    {category.name}
                  </h2>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
