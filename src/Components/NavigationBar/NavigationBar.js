import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../Contexts/userDataContext";
import { useAuth } from "../../hooks/useAuth";

const NavigationBar = () => {
  const navigate = useNavigate();
  const {
    userData: { cart, wishlist },
  } = useUserData();
  const { isUserLoggedIn } = useAuth();

  return (
    <nav className="bg-neutral-800 flex items-center py-3 px-3 fixed w-screen lg:w-full top-0 z-10">
      <h1
        className="text-white text-2xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Nova Store
      </h1>
      <div className="text-white flex ml-auto items-start space-x-5 text-xl">
        <div className="relative">
          <button aria-label="Wishlist" onClick={() => navigate("/wishlist")}>
            <FaHeart />
          </button>
          {wishlist.length > 0 && <div className="badge">{cart.length}</div>}
        </div>
        <div className="relative">
          <button aria-label="Cart" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
          </button>
          {cart.length > 0 && <div className="badge">{wishlist.length}</div>}
        </div>
        {isUserLoggedIn ? (
          <button aria-label="Profile" onClick={() => navigate("/profile")}>
            <FaUserCircle className="text-white" />
          </button>
        ) : (
          <button aria-label="Login" onClick={() => navigate("/login")}>
            <FiLogIn />
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
