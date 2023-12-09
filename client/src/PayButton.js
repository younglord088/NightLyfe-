import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/auth";

const PayButton = ({ cartItems, totalPrice }) => {
  console.log("cartItems", cartItems);
  const [auth, setAuth] = useAuth();
  const handleCheckout = async () => {
    console.log("Cart", cartItems);
    const res = axios
      .post(`${process.env.REACT_APP_API}/api/stripe/create-checkout-session`, {
        cartItems,
        totalPrice,
        user: auth.user,
      })
      .then((res) => {
        console.log("res", res);
        console.log("res.data", res.data.URL);
        window.location.href = res.data.URL;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </div>
  );
};

export default PayButton;