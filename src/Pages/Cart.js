import { useEffect, useState } from "react";
import { useUserData } from "../Contexts/userDataContext";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../Components/Loading";
import axios from "axios";
import { BASE_URL } from "../utils/utility";
import { CartItem, CheckoutBox } from "../Components/CartPageComponents";

export const Cart = () => {
  const { userProfile } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/carts/fetch-cart/${userProfile._id}`
      );
      setCart(data.items || []);
      setLoading(false);
    })();
  }, [userData.cart]);

  const isCartEmpty = cart.length < 1;

  return (
    <div className="pt-14 max-w-7xl ml-auto mr-auto h-full">
      <header className="py-4 px-12 md:p-8 text-xl font-semibold">
        <h2>Your cart</h2>
      </header>
      {loading && (
        <div className="flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-opacity-10 bg-black">
          <Loading withContainer={false} />
        </div>
      )}
      {!isCartEmpty && (
        <div className="flex flex-col md:flex-row justify-center h-full">
          <div className="md:m-2">
            {cart.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>
          <CheckoutBox cart={cart} />
        </div>
      )}
      {!loading && isCartEmpty && (
        <div className="flex justify-center items-center h-48 text-slate-500 font-semibold text-lg">
          No products in cart!
        </div>
      )}
    </div>
  );
};
