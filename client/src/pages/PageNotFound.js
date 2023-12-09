import React from "react";
import "../styles/pageNotFound.css";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout.js";

const PageNotFound = () => {
  return (
    <Layout
      title={"404! Page Not Found"}
      description={
        "We're sorry, but the page you are looking for does not exist."
      }
      keywords={"404, Page Not Found"}
    >
      <div className="page-not-found">
        <h1 className="heading">404! Page Not Found</h1>
        <p className="text">
          We're sorry, but the page you are looking for does not exist.
        </p>
        <button className="home-button">
          <Link to="/">Go to Home</Link>
        </button>
      </div>
    </Layout>
  );
};

export default PageNotFound;
