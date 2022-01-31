export const SortBy = ({ sort, deleteSearchParamList, replaceSearchParam }) => {
  return (
    <div className=" font-semibold">
      <label htmlFor="sort-by">Sort by </label>
      <select
        value={sort || "RELEVANCE"}
        name=""
        id="sort-by"
        className="bg-black text-white font-semibold rounded-md p-1 text-sm"
        onChange={({ target }) =>
          target.value === "RELEVANCE"
            ? deleteSearchParamList({ name: "sort" })
            : replaceSearchParam({ name: "sort", value: target.value })
        }
      >
        <option value="RELEVANCE">Relevance</option>
        <option value="LOW_TO_HIGH">low to high</option>
        <option value="HIGH_TO_LOW">high to low</option>
      </select>
    </div>
  );
};
