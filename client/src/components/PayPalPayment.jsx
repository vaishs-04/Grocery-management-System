import React, { useContext, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const PayPalPayment = () => {
  const { axios, setCartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Cart.jsx se bheja gaya data nikalna
  const { addressId, items, amount } = location.state || {};

  // FIX: Navigate ko useEffect ke andar rakhein taaki warning na aaye
  useEffect(() => {
    if (!items || !amount || !addressId) {
      toast.error("Order details missing. Please try again from cart.");
      navigate("/cart");
    }
  }, [items, amount, addressId, navigate]);

  if (!items || !amount || !addressId) {
    return null;
  }

  // --- AMOUNT CLEANING LOGIC ---
  // Agar amount string mein '$' symbol hai, toh use hata kar sirf number rakhega
  const cleanAmount = typeof amount === "string" ? amount.replace(/[^0-9.]/g, "") : amount;

  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-2">Checkout with PayPal</h2>
      <p className="text-gray-600 mb-8 font-medium">Payable Amount: ${cleanAmount}</p>
      
      <div className="w-full max-w-md shadow-lg p-6 rounded-lg bg-white border border-gray-100">
        <PayPalScriptProvider options={{ 
          "client-id": "Ae9LE2u_BDveuL1SribnRn-RvFj5UZfWdDp6WW0B_LzSEt0SHDoHBGLL-KLXINLfKZqZNQwzrvSjbboZ", 
          currency: "USD",
          intent: "capture"
        }}>
          <PayPalButtons
            style={{ layout: "vertical", shape: "rect", color: "gold" }}
            createOrder={(data, actions) => {
              // Console mein check karne ke liye ki kya amount ja raha hai
              console.log("Sending amount to PayPal:", cleanAmount);
              
              return actions.order.create({
                purchase_units: [{ 
                  amount: { 
                    currency_code: "USD",
                    value: cleanAmount.toString() 
                  } 
                }],
              });
            }}
            onApprove={async (data, actions) => {
              try {
                const details = await actions.order.capture();
                
                // Backend API call: Order ko database mein save karein
                const response = await axios.post("/api/order/paypal", { 
                  items, 
                  address: addressId, 
                  amount: cleanAmount, 
                  paymentId: details.id 
                });

                if (response.data.success) {
                  toast.success("Order Placed Successfully!");
                  setCartItems({}); // Cart clear karein
                  navigate("/my-orders");
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                console.error("Capture Error:", error);
                toast.error("Payment successful but database update failed.");
              }
            }}
            onError={(err) => {
              console.error("PayPal Error Details:", err);
              toast.error("PayPal Popup Error! Check if you are using a Sandbox account.");
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default PayPalPayment;