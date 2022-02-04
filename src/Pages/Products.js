import { useProducts } from "../Contexts/productsContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollToTop, useQueryParams } from "../hooks/index";
import { BASE_URL, getTransformedProducts } from "../utils/utility";
import { Loading } from "../Components/Loading";
import {
  Product,
  SortBy,
  Filters,
  MobileViewFilters,
} from "../Components/ProductsPageComponents/index";

export const Products = () => {
  useScrollToTop();
  const { products, setProducts, categories } = useProducts();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/products`);
      setProducts(data.products);
      setLoading(false);
    })();
  }, []);

  const { deleteSearchParamList, replaceSearchParam } =
    useQueryParams(searchParams);

  const categoryList = searchParams.getAll("category");
  const shippingFilter = searchParams.get("shipping") || "";
  const deliveryFilter = searchParams.get("delivery") || "";
  const stockFilter = searchParams.get("stock") || "";
  const sort = searchParams.get("sort") || "";

  const transformedProducts = getTransformedProducts(
    products,
    categoryList,
    deliveryFilter,
    shippingFilter,
    stockFilter,
    sort
  );

  return (
    <div className="md:grid md:grid-cols-[18rem_auto] pt-16 bg-zinc-50">
      <div className="border bg-white py-4 md:py-10 px-5">
        <div className="flex justify-between items-center md:block md:fixed">
          <SortBy
            sort={sort}
            replaceSearchParam={replaceSearchParam}
            deleteSearchParamList={deleteSearchParamList}
          />
          <Filters
            categories={categories}
            categoryList={categoryList}
            searchParams={searchParams}
          />
          <MobileViewFilters
            categories={categories}
            categoryList={categoryList}
            searchParams={searchParams}
          />
        </div>
      </div>
      {loading ? (
        <Loading withContainer={true} />
      ) : (
        <div className="grid grid-cols-2 gap-1 md:grid-cols-[repeat(auto-fill,minmax(15rem,_1fr))] md:gap-4 md:px-4">
          {transformedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
