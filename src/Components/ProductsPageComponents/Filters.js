import { CheckBox } from "./index";
import { filters } from "../../utils/utility";
import { useQueryParams } from "../../hooks/index";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Filters = ({ searchParams, categoryList, categories }) => {
  const { deleteSearchParamList, setCheckBoxCategory, setCheckBoxFilter } =
    useQueryParams(searchParams);
  return (
    <>
      <div className="z-20 bg-white px-3 py-5 w-full md:w-auto md:p-0 fixed left-0 bottom-0 hidden md:block md:static">
        <div className="mt-5 md:mt-10 flex items-start justify-around md:block relative">
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
                isChecked={categoryList.some((item) => category.name === item)}
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
          className="bg-black text-white py-1 px-2 rounded-md text-sm font-semibold ml-4 md:mt-5 md:ml-0"
          onClick={() => {
            deleteSearchParamList({ name: "stock" });
            deleteSearchParamList({ name: "delivery" });
            deleteSearchParamList({ name: "category" });
          }}
        >
          Clear Filters
        </button>
      </div>
    </>
  );
};

export const MobileViewFilters = ({
  searchParams,
  categoryList,
  categories,
}) => {
  const { deleteSearchParamList, setCheckBoxCategory, setCheckBoxFilter } =
    useQueryParams(searchParams);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <button
        className="py-2 w-1/2 md:hidden font-medium text-lg"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filters
      </button>
      <div
        role="dialog"
        className={`z-20 bg-white px-3 py-5 w-full md:w-auto md:p-0 fixed left-0 bottom-0 md:static ${
          showFilters ? "md:hidden block" : "hidden"
        }`}
      >
        <div className="mt-5 md:mt-10 flex items-start justify-around md:block relative">
          <button
            aria-label="close dialog"
            className="absolute right-1 -top-8 text-2xl md:hidden"
            onClick={() => setShowFilters(false)}
          >
            <AiOutlineCloseCircle />
          </button>
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
                isChecked={categoryList.some((item) => category.name === item)}
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
          className="bg-black text-white py-1 px-2 rounded-md text-sm font-semibold ml-4 md:mt-5 md:ml-0"
          onClick={() => {
            deleteSearchParamList({ name: "stock" });
            deleteSearchParamList({ name: "delivery" });
            deleteSearchParamList({ name: "category" });
          }}
        >
          Clear Filters
        </button>
      </div>
    </>
  );
};
