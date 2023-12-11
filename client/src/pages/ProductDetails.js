import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { json, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 style={{ textAlign: "center", color: "#E7473C", marginBottom: "20px", fontSize: "50px" }}>Product Details</h1>
      <div className="row mt-2" style={{ backgroundColor: "#E9F1FA"}}>
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }}
          />
        </div>
        <div className="col-md-6">
          <h2 style={{ color: "black", fontSize: "40px" }}>Name:- {product.name} </h2>
          <p style={{ fontSize: "20px", textAlign: "left" }}>Description:- {product.description} </p>
          <h3>Price:- Rs {product.price} </h3>
          <h4 style={{ fontSize: "30px" }}>Category:- {product.category?.name} </h4>
          <div className="text-md-center">
            <button className="btn btn-secondary" style={{ marginTop: "10px", backgroundColor: "#E7473C", border: "none" }}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container" style={{ width: "150%" }}>
        <h1 style={{ textAlign: "center", color: "#E7473C", marginBottom: "20px" }}>Similar Recommendations:-</h1>
        <div className="row" style={{ backgroundColor: "#E9F1FA"}}>
          {relatedProducts?.length === 0 ? (
            <h1 className="text-center">No Similar Products Found</h1>
          ) : (
            relatedProducts?.map((p) => (
              <div className="col-md-6 mb-3" key={p._id}>
                <div className="card" style={{ width: "200%", marginLeft:200 }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ borderRadius: "8px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "#FF3366" }}>{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text"> Rs {p.price}</p>
                    <button className="btn btn-secondary" style={{ backgroundColor: "#FF3366", border: "none" }}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
