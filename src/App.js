import { Route, Routes } from "react-router-dom";
import { useAuthPersist } from "./hooks/useAuthPersist";
import {
  Login,
  Cart,
  Wishlist,
  Signup,
  Home,
  Product,
  Products,
  Profile,
  Billing,
  OrderConfirm,
} from "./Pages/index";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  useAuthPersist();

  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/wishlist" element={<PrivateRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/billing" element={<PrivateRoute />}>
          <Route path="/billing" element={<Billing />} />
        </Route>
        <Route path="/order-confirm" element={<PrivateRoute />}>
          <Route path="/order-confirm" element={<OrderConfirm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
