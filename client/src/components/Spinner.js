import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/spinner.module.css";

function Spinner({ path = "login" }) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(
        `/${path}`,

        { state: location.pathname }
      );
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <h1 style={{ height: "100vh", alignItems: "center", marginTop: "50vh" }}>
        Redirecting to you in {count}
      </h1>
      <div className="spinner">
        <div className="spinner-inner">
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-circle"></div>
        </div>
      </div>
    </>
  );
}

export default Spinner;
