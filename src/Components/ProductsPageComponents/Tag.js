import { FaTags } from "react-icons/fa";
export const Tag = ({ text }) => {
  return (
    <div className="py-1 px-2 bg-slate-300 rounded-md text-xs max-w-fit">
      <FaTags className="inline mr-1" /> {text}
    </div>
  );
};
