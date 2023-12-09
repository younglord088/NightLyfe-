import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout
      title={"About Us"}
      description={
        "Our About page provides insight into our company's mission, values, and history. Learn more about our dedicated team, our commitment to excellence, and the unique qualities that set us apart. Discover why we are a trusted choice for our customers and partners in delivering exceptional products and services."
      }
      keywords={
        "About us, Mission, Values, History, Team, Commitment, Excellence, Unique, Trusted, Customers, Partners, Products, Services"
      }
    >
      <h1>About Page</h1>
    </Layout>
  );
};

export default About;
