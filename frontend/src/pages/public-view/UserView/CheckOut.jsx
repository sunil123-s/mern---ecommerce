
import React, { useState } from "react";
import img from "../../../assets/account.jpg";
import Address from "../Accounts/Address";
import { useSelector } from "react-redux";
import CartItems from "../PublicStructure/Shoplisting/CartItems";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const CheckOut = () => {
  const { cartItems, isLoading } = useSelector((state) => state.Cart);
  const { selectedAddress } = useSelector((state) => state.Address);
  const [isProcessing, setIsProcessing] = useState(false); 

  const TotalAmmout = cartItems?.items?.reduce((total, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    return total + price * item.quantity;
  }, 0);

  const handleEmptycart = () => {
    if (cartItems?.items?.length === 0) {
      toast.error("Cart is Empty please Select Items to proceed");
      return;
    }

    if (selectedAddress === null) {
      toast.error("Please select an address before proceeding.");
      return;
    }

    setIsProcessing(true); 
    
    const PayTimer = setInterval(() => {
      toast.success("Payment Successful");
      clearInterval(PayTimer);
      setIsProcessing(false); 
    }, 5000);

    toast.success("Proceeding to PayPal checkout.");
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={img}
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-5">
          {cartItems.items.map((item) => (
            <CartItems cartItems={item} />
          ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${TotalAmmout?.toFixed(2)}</span>
            </div>
            <div className="mt-4 w-full">
              <Button
                className={`w-full ${
                  isProcessing ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={handleEmptycart}
                disabled={isProcessing} 
              >
                Checkout With PayPal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
