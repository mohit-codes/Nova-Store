export const CheckoutBox = ({ cart }) => {
  const totalPrice = () => {
    return cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toLocaleString("en-IN");
  };

  return (
    <div className="border-l-2 border-gray-200 h-[75vh] md:ml-3 md:pl-3">
      <div className="pt-4">
        <h3 className="font-semibold text-xl pl-12 md:pl-0">Checkout</h3>
      </div>
      <div className="lg:w-96 rounded-sm shadow-md p-4">
        <div className="grid grid-cols-[2.5fr,1fr,1fr] py-3 font-medium text-center">
          <span>Product</span>
          <span>Quantity</span>
          <span>Total</span>
        </div>
        <div className="text-center">
          {cart.map((item) => (
            <div key={item._id} className="grid grid-cols-[2.5fr,1fr,1fr] py-4">
              <span className=" px-1">{item.product.name}</span>
              <span>{`x${item.quantity}`}</span>
              <span>{`₹${(item.quantity * item.product.price).toLocaleString(
                "en-IN"
              )}`}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-300 h-[1px]"></div>
        <div className="flex justify-end w-full my-2 space-x-2">
          <span>Grand total:</span>
          <span className="font-semibold">{`₹${totalPrice()}`}</span>
        </div>
        <div className="flex justify-end w-full mt-4">
          <button className="py-3 px-4 bg-red-600 text-white font-semibold rounded-sm">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
