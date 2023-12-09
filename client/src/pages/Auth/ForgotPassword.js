import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
    try {
      console.log("password", newPassword);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      console.log("res", res.data);
      if (res.data.success) {
        toast.success("Reset Password successfull");
        navigate("/login");
      } else {
        toast.error("Reset Password error");
      }
    } catch (error) {
      console.log("Reset password error", error);
      toast.error("Reset Password Error");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="container">
        <h1>REST PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="answer">Date Of Birth</label>
            <input
              type="text"
              id="answer"
              className="form-control"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
