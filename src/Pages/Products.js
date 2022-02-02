import { useProducts } from "../Contexts/productsContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollToTop, useQueryParams } from "../hooks/index";
import { BASE_URL, getTransformedProducts, filters } from "../utils/utility";
import { Loading } from "../Components/Loading";
import {
  Product,
  SortBy,
  CheckBox,
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

  const {
    deleteSearchParamList,
    replaceSearchParam,
    setCheckBoxCategory,
    setCheckBoxFilter,
  } = useQueryParams(searchParams);

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
    <div className="grid grid-cols-[18rem_auto] pt-16 bg-zinc-50">
      <div className="border bg-white py-10 px-5">
        <div className="fixed">
          <SortBy
            sort={sort}
            replaceSearchParam={replaceSearchParam}
            deleteSearchParamList={deleteSearchParamList}
          />
          <div className="mt-10 space-y-5">
            <div>
              <p className="font-semibold">Filters</p>
              {filters.map((filter) => (
                <CheckBox
                  key={filter.label}
                  label={filter.label}
                  callback={(e) => {
                    setCheckBoxFilter(e, filter.name, filter.value);
                  }}
                  isChecked={searchParams.get(filter.name) === filter.value}
                />
              ))}
            </div>
            <div>
              <p className="font-semibold">Categories</p>
              {categories.map((category) => (
                <CheckBox
                  isChecked={categoryList.some(
                    (item) => category.name === item
                  )}
                  key={category._id}
                  label={category.name}
                  callback={(e) =>
                    setCheckBoxCategory(e, "category", category.name)
                  }
                />
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white py-1 px-2 rounded-md text-sm font-semibold mt-5"
            onClick={() => {
              deleteSearchParamList({ name: "stock" });
              deleteSearchParamList({ name: "delivery" });
              deleteSearchParamList({ name: "category" });
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      {loading ? (
        <Loading withContainer={true} />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,_1fr))] gap-4 px-4">
          {transformedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
