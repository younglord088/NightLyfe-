import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //get all products
  const getCartProducts = async () => {
    try {
      console.log("aaa", auth);
      if (auth?.token) {
        axios.defaults.headers.common["Authorization"] = auth?.token;
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/get-cart`,
          {
            id: auth?.user?._id,
          }
        );
        console.log("DATAAAAAAAAA", data);
        setCart(data.cartProduct);
        setProducts(data.cartProduct);
      } else {
        console.log("no token provided");
      }

      // setProducts(data.cartProduct);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all cart product");
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((p) => {
        total += p.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/payment`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (email, phone) => {
    try {
      console.log("make payment");
      const response = await getData({ cart, email, phone });

      // const information = {
      //   action: "https://securegw-stage.paytm.in/order/process",
      //   params: response,
      // };

      // post(information);
      console.log(response);
      // res.json(response);
    } catch (error) {
      console.log(error);
    }
  };

  //remove cart item
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((p) => p._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}!`}
            </h1>
            <h2 className="text-center bg-light p-2">Your Cart</h2>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="110px"
                    height="250px"
                  />
                </div>
                <div className="col-md-8">
                  <p className="card-title" style={{fontSize:30}}>Name:-{p.name}</p>
                  <p className="card-text" style={{fontSize:30}}>
                    Description:-{p.description.substring(0, 30)}
                  </p>
                  <p className="card-text" style={{fontSize:25}}>Price:- Rs {p.price}</p>
                  <div className="d-flex justify-content-end">
                  <button 
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | checkout | payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Shipping Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change Address
                  </button>
                  <button
                    className="btn btn-outline-primary ml-2"
                    onClick={() =>
                      makePayment(auth?.user?.email, auth?.user?.phone)
                    }
                  >
                    Payment
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
