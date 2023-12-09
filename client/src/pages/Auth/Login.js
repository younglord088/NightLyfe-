import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/login.css"; // Import the CSS file
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import back from "../Auth/background"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if authentication token exists in local storage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuth(parsedAuth);
      navigate(location.state || "/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success("Login successful");
        const { user, token } = res.data;
        setAuth({ user, token });
        localStorage.setItem("auth", JSON.stringify({ user, token }));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Login error", error);
      toast.error("Login error");
    }
  };

  
  return (
    <Layout>
      <div style={{
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="container" style={{ textAlign: "center", color: "white", backgroundColor: "rgba(0, 0, 0, 0.7)", padding: "50px",marginTop:"200px" }}>
          <h1 style={{ color: "orange", marginBottom: "30px" }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" style={{ color: "white" }}>Email address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
      
            <div className="form-group">
              <label htmlFor="password" style={{ color: "white" }}>Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-login"
              style={{ background: "purple", color: "white", border: "none", padding: "8px 20px", marginRight: "10px" }}
            >
              Login
            </button>
            <button
              type="submit"
              className="btn btn-forgot"
              onClick={() => {
                navigate("/forgot-password");
              }}
              style={{ background: "red", color: "white", border: "none", padding: "8px 20px" }}
            >
              Forgot Password
            </button>
          </form>
      
          <p style={{ color: "orange", marginTop: "20px" }}>
            Don't have an account? <Link to="/register" style={{ color: "red" }}>Register</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};





export default Login;

