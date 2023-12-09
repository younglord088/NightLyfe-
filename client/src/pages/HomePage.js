import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import ChatBot from "../components/chatBot/ChatBot";

const HomePage = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
        toast.success("Product get successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/products-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error in getting all products");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/products-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/products-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/products-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout
      title={"Welcome to NightLyfe"}
      description={"Entertainment, Events, and more"}
      keywords={"fun, movies, events"}
      style={{ backgroundColor: "#201E20" }}
    >
      <div className="row mt-3" style={{ backgroundColor: "#E9F1FA"}} >
        <div
          className="col-md-2"
          style={{
            backgroundColor: "#DDD0C8",
            padding: "20px",
            color: "black",
          }}
        >
          <h4 className="text-center" style={{ marginBottom: "20px" ,backgroundColor: "#E9F1FA"}}>
            
          </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                style={{ marginBottom: "10px", color: "black" }}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Prices</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} style={{ marginBottom: "10px" }}>
                  <Radio value={p.array} style={{ color: "black" }}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
              style={{ width: "100%" }}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1
            className="text-center"
            style={{ color: "#2272FF", marginBottom: "30px",textDecoration: "underline", backgroundColor: "#E9F1FA",
            textDecorationColor: "purple", }}
          >
            All Events
          </h1>
          
          <div className="d-flex flex-wrap" >
            {products?.map((p) => (
              <div
                className="card m-2"
                style={{
                  width: "18rem",backgroundColor: "#201E20",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ maxHeight: "200px" }}
                />
                <div className="card-body"style={{
                     backgroundColor: "#F0F0F0",
                     color: "black",
                     padding: "10px",
                     display: "flex",
                     flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <h5 className="card-title" style={{ textAlign: "center" }}>{p.name}</h5>

                  <p className="card-text" style={{ color: "#555" }}>
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={{ color: "green", fontWeight: "bold" }}>
                    Rs {p.price}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ backgroundColor: "blue", border: "none" }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      axios.post(
                        `${process.env.REACT_APP_API}/api/v1/product/product-cart`,
                        {
                          cart: [...cart, p],
                          id: auth?.user?._id,
                        }
                      );
                      toast.success("Product added to cart");
                    }}
                    style={{ backgroundColor: "#E7473C", border: "none" }}
                  >
                    ADD TO BASKET
                  </button>
                </div>
              </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3" style={{backgroundColor: "E7473C"}}>
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                style={{ backgroundColor: "yellow", border: "none" }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
        <div
          style={{
            width: "40%",
            position: "absolute",
            marginLeft: "77%",
            marginTop: "17%",
            
            borderRadius: "10px",
            padding: "20px",
            color: "white",
          }}
        >
          {/* Additional content here */}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
