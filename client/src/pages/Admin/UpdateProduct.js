import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product from backend
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products/${params.slug}`
      );
      if (data?.success) {
        setName(data?.product?.name);
        setId(data?.product?._id);
        setDescription(data?.product?.description);
        setPrice(data?.product?.price);
        setShipping(data?.product?.shipping);
        setQuantity(data?.product?.quantity);
        setCategory(data?.product?.category._id);
        setPhoto(data?.product?.photo);
        toast.success("Product get successfully");
      } else {
        toast.error("Error in creating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get all categories from backend
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
        toast.success("Product get successfully");
      } else {
        toast.error("Error in creating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading categories");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  //handle create product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("shipping", shipping);
      formData.append("quantity", quantity);
      formData.append("category", category);
      photo && formData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        formData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        setName("");
        setId("");
        setDescription("");
        setPrice("");
        setShipping("");
        setQuantity("");
        setCategory("");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating product");
    }
  };

  //handle delete product
  const handleDelete = async () => {
    try {
      let asnwer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!asnwer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-products/${id}`
      );
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting product");
    }
  };

  return (
    <Layout title={"Dashboard - Create Products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Products</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                style={{ width: 200 }}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"150px"}
                      className="img-fluid img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/products-photo/${id}`}
                      alt={"product Image"}
                      height={"150px"}
                      className="img-fluid img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                type="text"
                value={description}
                placeholder="Enter product description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                value={price}
                placeholder="Enter product price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                value={quantity}
                placeholder="Enter product quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Shipping</label>
              <Select
                bordered={false}
                className="form-select"
                placeholder="Select shipping"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
