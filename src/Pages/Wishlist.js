import { useEffect, useState } from "react";
import { useUserData } from "../Contexts/userDataContext";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../Components/Loading";
import axios from "axios";
import { Product } from "../Components/ProductsPageComponents";
import { BASE_URL } from "../utils/utility";

export const Wishlist = () => {
  const { userProfile } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/wishlists/fetch-wishlist/${userProfile._id}`
      );
      setWishlist(data?.items || []);
      setLoading(false);
    })();
  }, [userData.wishlist]);

  const isWishlistEmpty = wishlist.length < 1;
  return (
    <div className="pt-14 max-w-7xl ml-auto mr-auto h-full">
      <header className="p-8 text-xl font-semibold">
        <h2>Your Wishlist</h2>
      </header>
      {loading && (
        <div className="z-10 flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-opacity-10 bg-black">
          <Loading withContainer={false} />
        </div>
      )}
      {!isWishlistEmpty && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,_1fr))] gap-4 p-4 h-full bg-gray-100">
          {wishlist.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
      {!loading && isWishlistEmpty && (
        <div className="flex justify-center items-center h-48 text-slate-500 font-semibold text-lg">
          No products in Wishlist!
        </div>
      )}
    </div>
  );
};
