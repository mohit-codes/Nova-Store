import { useNavigate } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
export const OrderConfirm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center pt-32 max-w-7xl md:ml-auto md:mr-auto h-full">
      <div className="">
        <BsCheck2Circle className="text-5xl text-green-400" />
        <div className="text-2xl font-medium">Order Confirmed !!</div>
        <div className="text-2xl font-medium">
          Thank you for shopping with us.
        </div>
        <div>
          <button
            className="text-white py-2 px-3 rounded-sm font-semibold bg-black tracking-wide w-full my-3 text-lg"
            onClick={() => navigate("/products", { replace: true })}
          >
            Shop more
          </button>
        </div>
      </div>
    </div>
  );
};
