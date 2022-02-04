export const BASE_URL = "https://nova-store.herokuapp.com";
export const filters = [
  { label: "Fast delivery", name: "delivery", value: "FAST_DELIVERY" },
  { label: "Free shipping", name: "shipping", value: "FREE_SHIPPING" },
  { label: "Include out of stock", name: "stock", value: "OUT_OF_STOCK" },
];

export const getFilteredProductsByCategory = (productList, filterList) => {
  if (filterList.length > 0) {
    return productList.filter((product) =>
      filterList.some(
        (filter) => filter.toLowerCase() === product.category.toLowerCase()
      )
    );
  }
  return productList;
};

export const getFilteredProductsByStock = (productList, stockFilter) => {
  if (stockFilter === "OUT_OF_STOCK") {
    return productList;
  }
  return productList.filter((product) => product.isInStock);
};

export const getFilteredProductsByFreeShipping = (
  productList,
  shippingFilter
) => {
  if (shippingFilter === "FREE_SHIPPING") {
    return productList.filter((product) => product.freeShipping);
  }
  return productList;
};

export const getFilteredProductsByDelivery = (productList, deliveryFilter) => {
  if (deliveryFilter === "FAST_DELIVERY") {
    return productList.filter((product) => product.fastDelivery);
  }
  return productList;
};

export const getSortedProductsByPrice = (productList, sortBy) => {
  switch (sortBy) {
    case "LOW_TO_HIGH":
      return [...productList].sort((a, b) => a.price - b.price);
    case "HIGH_TO_LOW":
      return [...productList].sort((a, b) => b.price - a.price);
    default:
      return productList;
  }
};

export const getTransformedProducts = (
  productList,
  categoryFilterList,
  deliveryFilter,
  shippingFilter,
  stockFilter,
  sortBy
) => {
  const filteredProductsByCategory = getFilteredProductsByCategory(
    productList,
    categoryFilterList
  );

  const filteredProductsByStock = getFilteredProductsByStock(
    filteredProductsByCategory,
    stockFilter
  );

  const filteredProductsByFreeShipping = getFilteredProductsByFreeShipping(
    filteredProductsByStock,
    shippingFilter
  );

  const filteredProductsByDelivery = getFilteredProductsByDelivery(
    filteredProductsByFreeShipping,
    deliveryFilter
  );

  const sortedProducts = getSortedProductsByPrice(
    filteredProductsByDelivery,
    sortBy
  );
  return sortedProducts;
};
