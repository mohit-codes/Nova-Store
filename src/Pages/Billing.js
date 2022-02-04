/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import BillingAddress from "../Components/BillingPageComponents/BillingAddress";
import { useAuth } from "../hooks/useAuth";
import { useUserActions } from "../hooks/useUserActions";
import { Loading } from "../Components/Loading";

export const Billing = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: userProfile.name,
    mobile: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const isFormEmpty = Object.values(formState).some((val) => val === "");

  const { handleCardPayment, handleOrderConfirm } = useUserActions(setLoading);
  const location = useLocation();
  const amount = location.state?.totalAmount;
  const parsedAmount = parseInt(amount.replaceAll(",", ""));
  const handlePayment = (token) => {
    const cart = { total: parsedAmount };
    handleCardPayment(token, cart);
  };

  return (
    <div className="pt-14 max-w-7xl md:ml-auto md:mr-auto h-full">
      {loading && (
        <div className="flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-opacity-10 bg-black">
          <Loading withContainer={false} />
        </div>
      )}
      <div className="flex items-center flex-col md:flex-row pt-16 md:px-10 lg:px-32 md:items-start md:space-x-40">
        <div className="w-3/4 md:w-1/3">
          <p className="text-xl font-semibold mb-5">Add Billing Information</p>
          <BillingAddress formState={formState} setFormState={setFormState} />
        </div>
        <div className="w-3/4 md:w-1/3 flex flex-col space-y-5">
          <p className="text-xl font-semibold mt-5 md:mt-0">Place Order</p>
          <button
            className="py-3 px-4 bg-red-600 text-white font-semibold rounded-sm lg:w-2/3"
            onClick={() => handleOrderConfirm()}
            disabled={isFormEmpty}
          >
            Cash on delivery
          </button>
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={handlePayment}
            amount={parsedAmount * 100}
            currency="INR"
            name="Nova Store"
          >
            <button
              className="py-3 px-4 bg-red-600 text-white font-semibold rounded-sm w-full lg:w-2/3"
              disabled={isFormEmpty}
            >
              Cashless Payment
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};
