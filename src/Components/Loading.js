import { ImSpinner9 } from "react-icons/im";
export const Loading = ({ withContainer }) => {
  return withContainer ? (
    <div className="flex justify-center items-center h-[90vh] w-full">
      <ImSpinner9 className="animate-spin text-5xl" />
    </div>
  ) : (
    <ImSpinner9 className="animate-spin text-5xl" />
  );
};
