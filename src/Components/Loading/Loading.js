import { ImSpinner9 } from "react-icons/im";
export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh] w-full">
      <ImSpinner9 className="animate-spin text-5xl" />
    </div>
  );
};
